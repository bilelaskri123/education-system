const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const TimeTable = require('../models/TimeTable')
const Group = require('../models/Group')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

var upload = multer({ storage: storage })

router.post('', upload.single('file'), async (req, res) => {
  // console.log(req.file);
  console.log(req.body)
  let timeTable = new TimeTable({
    group: req.body.group,
    name: req.file.originalname,
  })
  timeTable
    .save()
    .then(async (data) => {
      await Group.findById(req.body.group)
        .then((group) => {
          group.hasTable = true
          group.save()
        })
        .catch((error) =>
          res.status(500).json({ message: 'can not find this group' }),
        )
      res.status(201).json({
        message: 'time table created successfuly',
      })
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      })
    })
})

router.post('/download', function (req, res, next) {
  filepath = path.join(__dirname, '../uploads') + '/' + req.body.filename
  res.status(200).sendFile(filepath)
})

router.get('', (req, res) => {
  TimeTable.find()
    .populate('group', 'name level')
    .then((timeTables) => {
      res.status(200).send(timeTables)
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      })
    })
})

router.delete('/:id', (req, res) => {
  TimeTable.findByIdAndDelete(req.params.id)
    .then(async (data) => {
      console.log(data)
      await Group.findById(data.group).then((group) => {
        group.hasTable = false
        group.save()
        res.status(200).json({ message: 'deleted' })
      })
    })
    .catch((error) =>
      res.status(500).json({ message: 'deleting time table  failed' }),
    )
})

module.exports = router
