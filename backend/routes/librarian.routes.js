const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const User = require('../models/User')

router.post('', async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(409).json({
      message: 'librarian already exist',
    })
  }

  user = new User(
    _.pick(req.body, ['fullName', 'email', 'password', 'role', 'salary']),
  )
  const saltRounds = 10
  let salt = await bcrypt.genSalt(saltRounds)
  user.password = await bcrypt.hash(user.password, salt)

  await user.save().then((userCreated) => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'askribilel123@gmail.com',
        pass: 'bilel123express#',
      },
    })
    const email = req.body.email
    var mailOptions = {
      from: 'bilel123express#',
      to: email,
      subject: 'Account Created Successfuly!!',
      html:
        '<h3> your account successfully created on education system application!!</h3> <br><br><strong> Email:</strong> ' +
        req.body.email +
        '<br><strong> Password:</strong> ' +
        req.body.password +
        '<br><strong> Role:</strong> ' +
        req.body.role,
    }

    transporter.sendMail(mailOptions, function (err, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent' + info.response)
      }
    })
    res.status(201).json({
      message: 'librarian created',
      user: _.pick(userCreated, ['_id', 'fullName', 'email', 'role', 'salary']),
    })
  })
})

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((librarian) => {
      res
        .status(200)
        .json(_.pick(librarian, ['fullName', 'email', '_id', 'salary']))
    })
    .catch((error) => {
      res.status(500).json({
        message: 'fetching data failed!',
      })
    })
})

router.put('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((librarian) => {
      librarian.fullName = req.body.fullName
      librarian.email = req.body.email
      librarian.salary = req.body.salary

      librarian
        .save()
        .then(() => {
          res.status(200).json({
            message: 'librarian updated',
          })
        })
        .catch((error) => {
          res.status(500).json({
            message: 'updating librarian failed',
          })
        })
    })
    .catch((error) => {
      res.status(500).json({ message: 'updating librarian failed' })
    })
})

// router.get('', (req, res) => {
//   let count
//   let librarians = []
//   let librarian = {}
//   User.countDocuments({ role: 'librarian' }).then((result) => {
//     count = result
//   })
//   User.find({ role: 'librarian' })
//     .select('-password')
//     .then((result) => {
//       result.forEach((data) => {
//         librarian.fullName = data.fullName
//         librarian.email = data.email
//         librarian.role = data.role
//         librarian.salary = data.salary
//         librarian._id = data._id

//         librarians.push(librarian)
//         librarian = {}
//       })
//       res.status(200).json({ librarians: librarians, count: count })
//     })
//     .catch((error) => res.status(500).json({ message: 'an error occurred' }))
// })

router.get('', (req, res) => {
  const pageSize = +req.query.pagesize
  const currentPage = +req.query.page
  const filter = req.query.search
  const librarianQuery = User.find({
    $and: [
      { role: 'librarian' },
      {
        $or: [{ fullName: { $regex: filter } }, { email: { $regex: filter } }],
      },
    ],
  })
  let count
  User.countDocuments({ role: 'librarian' }).then((result) => {
    count = result
  })
  let librarians = []
  let librarian = {}
  if (pageSize && currentPage) {
    librarianQuery.skip(pageSize * (currentPage - 1)).limit(pageSize)
  }
  librarianQuery
    .then((result) => {
      result.forEach((data) => {
        librarian.fullName = data.fullName
        librarian.email = data.email
        librarian.role = data.role
        librarian.salary = data.salary
        librarian._id = data._id

        librarians.push(librarian)
        librarian = {}
      })
      res.status(200).json({
        message: 'Librarian fetched successfuly!',
        count: count,
        librarians: librarians,
      })
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      })
    })
})

router.delete('/:id', (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'Librarian deleted successfuly',
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
