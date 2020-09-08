const express = require("express");
const router = express.Router();

const ReservationProduct = require("../models/ReservationProduct");
const Product = require("../models/Product");

router.post("/", (req, res) => {
  // console.log(req.body);
  const reservation = new ReservationProduct({
    user: req.body.user,
    product: req.body.product,
  });
  console.log(reservation);

  ReservationProduct.findOne({ user: req.body.user }, (err, reservat) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    }

    if (reservat != null) {
      res.json("user have a reservation can not reserve another product");
    } else {
      Product.findById(req.body.product, (err, selectedProduct) => {
        if (err) {
          res.status(500).json({
            error: err,
          });
        } else {
          selectedProduct.stock--;
          selectedProduct.save();

          reservation.save((err, reserv) => {
            if (err) {
              res.status(500).json({
                error: err,
              });
            } else {
              res
                .status(201)
                .json({ message: "reservation saved successfuly" });
            }
          });
        }
      });
    }
  });
});

router.get("/", async (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  let reserQuerry = ReservationProduct.find()
    .select("user product dateReservation _id")
    .populate("user", "email role")
    .populate("product", "name");

  if (pageSize && currentPage) {
    reserQuerry.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  reserQuerry
    .then((docs) => {
      ReservationProduct.countDocuments().then((count) => {
        res.status(200).json({
          message: "reservation fetched successfuly",
          count: count,
          reservations: docs.map((doc) => {
            return {
              _id: doc._id,
              user: doc.user,
              product: doc.product,
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

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  ReservationProduct.findById(id)
    .select("user product dateReservation _id")
    .populate("user", "firstName lastName email ")
    .populate("product", "name")
    .exec()
    .then((doc) => {
      res.status(200).json({
        reservation: {
          _id: doc._id,
          user: doc.user,
          product: doc.product,
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
  ReservationProduct.findByIdAndDelete(id, (err, reservation) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      Product.findById(reservation.product, (err, selectedProduct) => {
        if (err) {
          res.status(500).json({
            error: err,
          });
        } else {
          selectedProduct.stock++;
          selectedProduct
            .save()
            .then(() => {
              res.status(200).json({
                message: "reservation deleted successfully",
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        }
      });
    }
  });
});

module.exports = router;
