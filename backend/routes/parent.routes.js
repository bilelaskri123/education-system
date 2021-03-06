const express = require('express')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const router = express.Router()

const User = require('../models/User')

const checkAuth = require('../middleware/check-auth')
const role = require('../middleware/role')

router.post('', checkAuth, role.isAdmin, async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(409).json({
      message: 'parent already exist',
    })
  }

  user = new User(
    _.pick(req.body, ['fullName', 'email', 'password', 'role', 'childEmail']),
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
        message: 'parent created',
        user: _.pick(userCreated, [
          '_id',
          'fullName',
          'email',
          'role',
          'childEmail',
        ]),
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/:id', checkAuth, (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      res
        .status(200)
        .json(_.pick(data, ['fullName', 'email', '_id', 'role', 'childEmail']))
    })
    .catch((error) => {
      res.status(500).json({
        message: "can't fetching parent",
      })
    })
})

router.put('/:id', checkAuth, role.isAdmin, (req, res) => {
  User.findById(req.params.id)
    .then((parent) => {
      parent.fullName = req.body.fullName
      parent.email = req.body.email
      parent.childEmail = req.body.childEmail

      parent
        .save()
        .then((data) => {
          res.status(201).json({
            message: 'parent updated successfuly!',
          })
        })
        .catch((error) => {
          console.log(error)
          res.status(500).json({
            message: 'updating parent failed!',
          })
        })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'fetching parent failed!',
      })
    })
})

router.get('', checkAuth, (req, res) => {
  console.log(req.query)
  const pageSize = +req.query.pagesize
  const currentPage = +req.query.page
  const filter = req.query.search
  const parentQuery = User.find({
    $and: [
      { role: 'parent' },
      {
        $or: [{ fullName: { $regex: filter } }, { email: { $regex: filter } }],
      },
    ],
  })
  let count
  User.countDocuments({ role: 'parent' }).then((result) => {
    count = result
  })
  let parents = []
  let parent = {}
  if (pageSize && currentPage) {
    parentQuery.skip(pageSize * (currentPage - 1)).limit(pageSize)
  }
  parentQuery
    .then((result) => {
      result.forEach((data) => {
        parent.fullName = data.fullName
        parent.email = data.email
        parent.role = data.role
        parent.childEmail = data.childEmail
        parent._id = data._id

        parents.push(parent)
        parent = {}
      })
      res.status(200).json({
        message: 'parent fetched successfuly!',
        count: count,
        parents: parents,
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'cannot find parents',
      })
    })
})

router.delete('/:id', checkAuth, role.isAdmin, (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'parent deleted successfuly',
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
