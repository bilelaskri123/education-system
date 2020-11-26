const express = require('express')
const router = express.Router()
const Setting = require('../models/Setting')
const checkAuth = require('../middleware/check-auth')
const User = require('../models/User')

router.put('', checkAuth, (req, res) => {
  let userId = req.userData.userId
  Setting.findOne({ userId: userId })
    .then((setting) => {
      if (setting == null) {
        let setting = new Setting({
          userId: userId,
          paginator: req.body.paginator,
          score: req.body.score,
          admis: req.body.admis,
        })
        console.log(setting)

        setting
          .save()
          .then(() => {
            res.status(201).json({ message: 'settings updated successfuly' })
          })
          .catch((error) => {
            console.log(error)
            res.status(500).json({ message: 'can not update settings values' })
          })
      } else {
        setting.paginator = req.body.paginator
        setting.score = req.body.score
        setting.admis = req.body.admis

        setting
          .save()
          .then(() => {
            res.status(201).json({ message: 'settings updated successfuly' })
          })
          .catch((error) => {
            console.log(error)
            res.status(500).json({ message: 'can not update settings values' })
          })
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'an error occured ' })
    })
})

router.get('', checkAuth, (req, res) => {
  Setting.findOne({ userId: req.userData.userId })
    .then((setting) => {
      res.status(200).json({ setting: setting })
    })
    .catch((error) =>
      res.status(500).json({ message: 'failed to update settings' }),
    )
})

module.exports = router
