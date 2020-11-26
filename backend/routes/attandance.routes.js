const express = require('express')
const router = express.Router()
const Attandance = require('../models/Attendance')

router.post('', (req, res) => {
  let attandance = new Attandance({
    section: req.body.section,
    group: req.body.group,
    lesson: req.body.lesson,
    students: req.body.students,
  })

  attandance
    .save()
    .then((result) => {
      res.status(201).json({ message: 'attandance added successfuly' })
    })
    .catch((error) =>
      res.status(500).json({ message: 'failed to add this attandance' }),
    )
})

router.get('', (req, res) => {
  const pageSize = +req.query.pagesize
  const currentPage = +req.query.page
  const section = req.query.section
  const group = req.query.group
  const lesson = req.query.lesson

  let maxAttandance = 0
  Attandance.estimatedDocumentCount((error, count) => {
    maxAttandance = count
  })

  const attandanceQuery = Attandance.find()
    .populate('section', 'name')
    .populate('group', 'name level')
    .populate('lesson', 'name')

  if (section != '' && group != '' && lesson != '') {
    attandanceQuery.where({ section: section, group: group, lesson: lesson })
  } else if (section != '' && group != '') {
    attandanceQuery.where({ section: section, group: group })
  } else if (section != '') {
    attandanceQuery.where({ section: section })
  }

  if (pageSize && currentPage) {
    attandanceQuery.skip(pageSize * (currentPage - 1)).limit(pageSize)
  }
  attandanceQuery
    .then((attandances) => {
      res
        .status(200)
        .json({ attandances: attandances, maxAttandance: maxAttandance })
    })
    .catch((error) =>
      res.status(500).json({ message: 'can not find evaluation' }),
    )
})

router.delete('/:id', (req, res) => {
  Attandance.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json({ message: 'this attendance deleted with success!' })
    })
    .catch((error) => {
      res.status(500).json({ message: 'an error occurred!' })
    })
})

module.exports = router
