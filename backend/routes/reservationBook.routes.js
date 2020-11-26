const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const ReservationBook = require('../models/ReservationBook')
const Book = require('../models/Book')
const checkAuth = require('../middleware/check-auth')

router.post('/', (req, res) => {
  const reservation = new ReservationBook({
    user: req.body.user,
    book: req.body.book,
  })

  ReservationBook.findOne({ user: req.body.user }, (err, reservat) => {
    if (err) {
      res.status(500).json({ message: err.message })
    }

    if (reservat.result == 'accepted') {
      res.status(403).json({
        message: 'user have a reservation can not reserve another book',
      })
    } else {
      Book.findById(req.body.book)
        .then((book) => {
          book.copies--
          book.save()
          reservation.save((err, reserv) => {
            if (err) {
              res
                .status(500)
                .json({ message: 'sorry can not reserve this book' })
            } else {
              res.status(200).json({
                message: 'reservation saved successfuly',
              })
            }
          })
        })
        .catch((error) => {
          res.status(500).json({
            message: 'sorry can not reserve this book',
          })
        })
    }
  })
})

router.post('/demande-reservation', checkAuth, (req, res) => {
  let user = req.userData.userId
  const reservation = new ReservationBook({
    user: user,
    book: req.body.book,
  })

  ReservationBook.findOne({ user: user }, (error, result) => {
    if (!error && result) {
      res.status(500).json({ message: 'you have another demande' })
    } else {
      reservation
        .save()
        .then((reser) => {
          res.status(200).json({ message: 'reservation added successfuly' })
        })
        .catch((err) =>
          res.status(500).json({ message: 'can not add this reservation' }),
        )
    }
  })
})

router.put('/accept-reservation/:id', (req, res) => {
  let reserId = req.params.id
  ReservationBook.findById(reserId).then(async (reser) => {
    reser.status = 'accepted'
    await Book.findById(reser.book).then((book) => {
      book.copies--
      book.save()
    })
    reser
      .save()
      .then((result) => {
        res.status(200).json({ message: 'reservation accepted' })
      })
      .catch((error) =>
        res
          .status(500)
          .json({ message: 'sorry can not accept this reservation now' }),
      )
  })
})

router.put('/refuse-reservation/:id', (req, res) => {
  let reserId = req.params.id
  ReservationBook.findById(reserId).then((reser) => {
    reser.status = 'refused'
    reser
      .save()
      .then(() => {
        res.status(200).json({ message: 'reservation refused' })
      })
      .catch((error) =>
        res.status(500).json({ message: 'can not reset this reservation now' }),
      )
  })
})

router.get('/', async (req, res) => {
  const pageSize = +req.query.pagesize
  const currentPage = +req.query.page
  let count
  let reserQuerry = ReservationBook.find({ status: 'accepted' })
    .select('user book dateReservation _id status')
    .populate('user', 'email role')
    .populate('book', 'title')

  if (pageSize && currentPage) {
    reserQuerry.skip(pageSize * (currentPage - 1)).limit(pageSize)
  }

  reserQuerry
    .then((docs) => {
      ReservationBook.countDocuments({ status: 'accepted' }).then((count) => {
        res.status(200).json({
          message: 'reservation fetched successfuly',
          count: count,
          reservations: docs.map((doc) => {
            return {
              _id: doc._id,
              user: doc.user,
              book: doc.book,
              dateReservation: doc.dateReservation,
              status: doc.status,
            }
          }),
        })
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'can not find reservations',
      })
    })
})

router.get('/demands', async (req, res) => {
  const pageSize = +req.query.pagesize
  const currentPage = +req.query.page
  let count
  let reserQuerry = ReservationBook.find({ status: 'ongoing' })
    .select('user book dateReservation _id status')
    .populate('user', 'email role')
    .populate('book', 'title')

  if (pageSize && currentPage) {
    reserQuerry.skip(pageSize * (currentPage - 1)).limit(pageSize)
  }

  reserQuerry
    .then((docs) => {
      ReservationBook.countDocuments({ status: 'ongoing' }).then((count) => {
        res.status(200).json({
          message: 'reservation fetched successfuly',
          count: count,
          reservations: docs.map((doc) => {
            return {
              _id: doc._id,
              user: doc.user,
              book: doc.book,
              dateReservation: doc.dateReservation,
              status: doc.status,
            }
          }),
        })
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'can not find reservations',
      })
    })
})

router.get('/myReservation', checkAuth, (req, res) => {
  let userId = req.userData.userId
  ReservationBook.find({ user: userId })
    .populate('user', 'fullName email role')
    .populate('book', 'title')
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((error) => {
      res.status(500).json({
        message: 'can not found this reservation',
      })
    })
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  ReservationBook.findById(id)
    .select('user book dateReservation _id')
    .populate('user', 'fullName email')
    .populate('book', 'title')
    .exec()
    .then((doc) => {
      res.status(200).json({
        reservation: {
          _id: doc._id,
          user: doc.user,
          book: doc.book,
          dateReservation: doc.dateReservation,
        },
      })
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      })
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  ReservationBook.findByIdAndDelete(id, (err, reservation) => {
    if (err) {
      console.log(err)
    } else {
      console.log(reservation)
      Book.findById(reservation.book, (err, selectedBook) => {
        if (err) {
          res.status(500).json({
            error: err,
          })
        } else {
          selectedBook.copies++
          selectedBook.save().then(() => {
            res
              .status(200)
              .json({ message: 'reservation deleted successfully' })
          })
        }
      })
    }
  })
})

module.exports = router
