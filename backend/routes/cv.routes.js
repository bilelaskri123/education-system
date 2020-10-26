const express = require('express')
const checkAuth = require('../middleware/check-auth')
const Cv = require('../models/CV')
const router = express.Router()

router.post('', checkAuth, async (req, res) => {
  await Cv.findOne({ userId: req.userData.userId }).then((cvData) => {
    if (cvData) {
      cvData.profile = req.body.profile
      cvData.userId = req.userData.userId
      cvData.skills = req.body.skills
      cvData.projects = req.body.projects
      cvData.langues = req.body.langues
      cvData
        .save()
        .then((newData) => {
          res.status(200).json({ message: 'your cv created successfully' })
        })
        .catch((error) =>
          res.status(500).json({ message: 'an error occurred cv not saved' }),
        )
    } else {
      var newCv = new Cv({
        userId: req.userData.userId,
        profile: req.body.profile,
        skills: req.body.skills,
        projects: req.body.projects,
        langues: req.body.langues,
      })
      console.log(newCv)
      newCv
        .save()
        .then((data) => {
          res.status(200).json({ message: 'your cv created successfully' })
        })
        .catch((error) => {
          res.status(500).json({ message: 'an error occurred cv not saved' })
        })
    }
  })
})

router.get('/detail', checkAuth, (req, res) => {
  Cv.findOne({ userId: req.userData.userId })
    .then((cvData) => {
      res.status(200).json({ cv: cvData })
    })
    .catch((error) => res.status(500).json({ message: 'fetching cv failed!' }))
})

router.get('/:userId', checkAuth, (req, res) => {
  console.log(req.params.userId)
  Cv.findOne({ userId: req.params.userId })
    .populate('userId', '-password')
    .then((cvDetail) => {
      res.status(200).json({ cv: cvDetail })
    })
    .catch((error) =>
      res.status(500).json({ message: 'fetching cv detail failed' }),
    )
})

router.delete('path', (req, res) => {
  return
})

module.exports = router
