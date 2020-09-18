const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const ReservationBook = require("../models/ReservationBook");
const Book = require("../models/Book");
const checkAuth = require("../middleware/check-auth");

router.post("/", (req, res) => {
  console.log(req.body);
  const reservation = new ReservationBook({
    user: req.body.user,
    book: req.body.book,
  });

  ReservationBook.findOne({ user: req.body.user }, (err, reservat) => {
    if (err) {
      res.status(500).send(err);
    }

    if (reservat != null) {
      res.send("user have a reservation can not reserve another book");
    } else {
      Book.findById(req.body.book)
        .then((book) => {
          book.copies--;
          book.save();
          reservation.save((err, reserv) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).json({
                message: "reservation saved successfuly",
              });
            }
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
});

router.get("/", async (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  let count;
  let reserQuerry = ReservationBook.find()
    .select("user book dateReservation _id")
    .populate("user", "email role")
    .populate("book", "title");

  if (pageSize && currentPage) {
    reserQuerry.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  reserQuerry
    .then((docs) => {
      ReservationBook.countDocuments().then((count) => {
        res.status(200).json({
          message: "reservation fetched successfuly",
          count: count,
          reservations: docs.map((doc) => {
            return {
              _id: doc._id,
              user: doc.user,
              book: doc.book,
              dateReservation: doc.dateReservation,
            };
          }),
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/myReservation", checkAuth, (req, res) => {
  let userId = req.userData.userId;
  ReservationBook.find({ user: userId })
    .populate("user", "fullName email role")
    .populate("book", "title")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  ReservationBook.findById(id)
    .select("user book dateReservation _id")
    .populate("user", "fullName email")
    .populate("book", "title")
    .exec()
    .then((doc) => {
      res.status(200).json({
        reservation: {
          _id: doc._id,
          user: doc.user,
          book: doc.book,
          dateReservation: doc.dateReservation,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  ReservationBook.findByIdAndDelete(id, (err, reservation) => {
    if (err) {
      console.log(err);
    } else {
      console.log(reservation);
      Book.findById(reservation.book, (err, selectedBook) => {
        if (err) {
          res.status(500).json({
            error: err,
          });
        } else {
          selectedBook.copies++;
          selectedBook.save().then(() => {
            res
              .status(200)
              .json({ message: "reservation deleted successfully" });
          });
        }
      });
    }
  });
});

module.exports = router;
