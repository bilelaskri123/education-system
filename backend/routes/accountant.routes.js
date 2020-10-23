const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const _ = require('lodash')
const nodemailer = require('nodemailer')

const User = require('../models/User')

router.post('', async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(409).json({
      message: 'user already exist',
    })
  }

  user = new User(
    _.pick(req.body, ['fullName', 'email', 'password', 'role', 'salary']),
  )
  const saltRounds = 10
  let salt = await bcrypt.genSalt(saltRounds)
  user.password = await bcrypt.hash(user.password, salt)

  await user
    .save()
    .then((userCreated) => {
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
        message: 'user created',
        user: _.pick(userCreated, [
          '_id',
          'fullName',
          'email',
          'role',
          'salary',
        ]),
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((accountant) => {
      res
        .status(200)
        .json(_.pick(accountant, ['fullName', 'email', '_id', 'salary']))
    })
    .catch((error) => {
      res.status(500).json({
        message: 'fetching accountant failed!',
      })
    })
})

router.put('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((accountant) => {
      accountant.fullName = req.body.fullName
      accountant.email = req.body.email
      accountant.salary = req.body.salary

      accountant
        .save()
        .then(() => {
          res.status(200).json({
            message: 'succes updated!',
          })
        })
        .catch((error) => {
          res.status(500).json({
            message: 'updating accountant failed!',
          })
        })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'updating accountant failed!',
      })
    })
})

// router.get('', (req, res) => {
//   let count
//   let accountants = []
//   let accountant = {}
//   User.countDocuments({ role: 'accountant' }).then((result) => {
//     count = result
//   })
//   User.find({ role: 'accountant' })
//     .select('-password')
//     .then((result) => {
//       result.forEach((data) => {
//         accountant.fullName = data.fullName
//         accountant.email = data.email
//         accountant.role = data.role
//         accountant.salary = data.salary
//         accountant._id = data._id

//         accountants.push(accountant)
//         accountant = {}
//       })
//       res.status(200).json({ accountants: accountants, count: count })
//     })
//     .catch((error) => res.status(500).json({ message: 'an error occurred' }))
// })

router.get('', (req, res) => {
  const pageSize = +req.query.pagesize
  const currentPage = +req.query.page
  const filter = req.query.search
  const accountantQuery = User.find({
    $and: [
      { role: 'accountant' },
      {
        $or: [{ fullName: { $regex: filter } }, { email: { $regex: filter } }],
      },
    ],
  })
  let count
  User.countDocuments({ role: 'accountant' }).then((result) => {
    count = result
  })
  let accountants = []
  let accountant = {}
  if (pageSize && currentPage) {
    accountantQuery.skip(pageSize * (currentPage - 1)).limit(pageSize)
  }
  accountantQuery
    .then((result) => {
      result.forEach((data) => {
        accountant.fullName = data.fullName
        accountant.email = data.email
        accountant.role = data.role
        accountant.salary = data.salary
        accountant._id = data._id

        accountants.push(accountant)
        accountant = {}
      })
      res.status(200).json({
        message: 'Accountant fetched successfuly!',
        count: count,
        accountants: accountants,
      })
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      })
    })
})

router.delete('/:id', (req, res) => {
  console.log(req.params.id)
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: 'Accountant deleted successfuly',
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
