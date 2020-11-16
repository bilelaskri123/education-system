const express = require('express')
const router = express.Router()

const ReservationProduct = require('../models/ReservationProduct')
const Product = require('../models/Product')
const checkAuth = require('../middleware/check-auth')

router.post('/', (req, res) => {
  const reservation = new ReservationProduct({
    user: req.body.user,
    product: req.body.product,
  })
  console.log(reservation)

  ReservationProduct.findOne({ user: req.body.user }, (err, reservat) => {
    if (err) {
      res.status(500).json({
        error: err,
      })
    }

    if (reservat != null) {
      res.json('user have a reservation can not reserve another product')
    } else {
      Product.findById(req.body.product, (err, selectedProduct) => {
        if (err) {
          res.status(500).json({
            error: err,
          })
        } else {
          selectedProduct.stock--
          selectedProduct.save()

          reservation.save((err, reserv) => {
            if (err) {
              res.status(500).json({
                error: err,
              })
            } else {
              res.status(201).json({ message: 'reservation saved successfuly' })
            }
          })
        }
      })
    }
  })
})

router.post('/demande-reservation', checkAuth, (req, res) => {
  let user = req.userData.userId
  const reservation = new ReservationProduct({
    user: user,
    product: req.body.product,
  })

  ReservationProduct.findOne({ user: user }, (error, result) => {
    if (!error && result.status == 'accepted') {
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

router.put('/accept-reservation/:id', checkAuth, (req, res) => {
  let reserId = req.params.id
  ReservationProduct.findById(reserId).then((reser) => {
    reser.status = 'accepted'
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

router.put('/refuse-reservation/:id', checkAuth, (req, res) => {
  let reserId = req.params.id
  ReservationProduct.findById(reserId).then((reser) => {
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

router.get('/myReservation', checkAuth, (req, res) => {
  let userId = req.userData.userId
  ReservationProduct.find({ user: userId })
    .populate('user', 'fullName email role')
    .populate('product', 'name')
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Sorry, can not found your reservation ',
      })
    })
})

router.get('/', async (req, res) => {
  const pageSize = +req.query.pagesize
  const currentPage = +req.query.page
  let reserQuerry = ReservationProduct.find({ status: 'accepted' })
    .select('user product dateReservation _id status')
    .populate('user', 'email role')
    .populate('product', 'name')

  if (pageSize && currentPage) {
    reserQuerry.skip(pageSize * (currentPage - 1)).limit(pageSize)
  }

  reserQuerry
    .then((docs) => {
      ReservationProduct.countDocuments({ status: 'accepted' }).then(
        (count) => {
          res.status(200).json({
            message: 'reservation fetched successfuly',
            count: count,
            reservations: docs.map((doc) => {
              return {
                _id: doc._id,
                user: doc.user,
                product: doc.product,
                dateReservation: doc.dateReservation,
                status: doc.status,
              }
            }),
          })
        },
      )
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      })
    })
})

router.get('/demands', async (req, res) => {
  const pageSize = +req.query.pagesize
  const currentPage = +req.query.page
  let count
  let reserQuerry = ReservationProduct.find({ status: 'ongoing' })
    .select('user product dateReservation _id status')
    .populate('user', 'email role')
    .populate('product', 'name')

  if (pageSize && currentPage) {
    reserQuerry.skip(pageSize * (currentPage - 1)).limit(pageSize)
  }

  reserQuerry
    .then((docs) => {
      ReservationProduct.countDocuments({ status: 'ongoing' }).then((count) => {
        res.status(200).json({
          message: 'reservation fetched successfuly',
          count: count,
          reservations: docs.map((doc) => {
            return {
              _id: doc._id,
              user: doc.user,
              product: doc.product,
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

router.get('/:id', async (req, res) => {
  const id = req.params.id
  ReservationProduct.findById(id)
    .select('user product dateReservation _id')
    .populate('user', 'firstName lastName email ')
    .populate('product', 'name')
    .exec()
    .then((doc) => {
      res.status(200).json({
        reservation: {
          _id: doc._id,
          user: doc.user,
          product: doc.product,
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
  ReservationProduct.findByIdAndDelete(id, (err, reservation) => {
    if (err) {
      res.status(500).json({
        error: err,
      })
    } else {
      Product.findById(reservation.product, (err, selectedProduct) => {
        if (err) {
          res.status(500).json({
            error: err,
          })
        } else {
          selectedProduct.stock++
          selectedProduct
            .save()
            .then(() => {
              res.status(200).json({
                message: 'reservation deleted successfully',
              })
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              })
            })
        }
      })
    }
  })
})

module.exports = router
