const express = require('express')
const router = express.Router()
const Evaluation = require('../models/Evaluation')

router.post('', (req, res) => {
  let evaluation = new Evaluation({
    section: req.body.section,
    group: req.body.group,
    lesson: req.body.lesson,
    students: req.body.students,
  })

  evaluation
    .save()
    .then((result) => {
      res.status(201).json({ message: 'evaluation added successfuly' })
    })
    .catch((error) =>
      res.status(500).json({ message: 'failed to add this evaluation' }),
    )
})

router.get('/:id', (req, res) => {
  Evaluation.findById(req.params.id)
    .then((evaluation) => {
      res.status(200).json({ evaluation: evaluation })
    })
    .catch((error) =>
      res.status(500).json({ message: 'can not find this evaluation' }),
    )
})

router.get('', (req, res) => {
  const pageSize = +req.query.pagesize
  const currentPage = +req.query.page
  const section = req.query.section
  const group = req.query.group
  const lesson = req.query.lesson

  let maxEvaluation = 0
  Evaluation.estimatedDocumentCount((error, count) => {
    maxEvaluation = count
  })

  const evaluationQuery = Evaluation.find()
    .populate('section', 'name')
    .populate('group', 'name level')
    .populate('lesson', 'name')

  if (section != '' && group != '' && lesson != '') {
    evaluationQuery.where({ section: section, group: group, lesson: lesson })
  } else if (section != '' && group != '') {
    evaluationQuery.where({ section: section, group: group })
  } else if (section != '') {
    evaluationQuery.where({ section: section })
  }

  if (pageSize && currentPage) {
    evaluationQuery.skip(pageSize * (currentPage - 1)).limit(pageSize)
  }
  evaluationQuery
    .then((evaluations) => {
      res
        .status(200)
        .json({ evaluations: evaluations, maxEvaluation: maxEvaluation })
    })
    .catch((error) =>
      res.status(500).json({ message: 'can not find evaluation' }),
    )
})

router.put('/:id', (req, res) => {
  Evaluation.findById(req.params.id)
    .then((evaluation) => {
      evaluation.section = req.body.section
      evaluation.group = req.body.group
      evaluation.lesson = req.body.lesson
      evaluation.students = req.body.students
      evaluation.save()
    })
    .catch((error) =>
      res.status(500).json({ message: 'can not update this evaluation' }),
    )
})

router.delete('/:id', (req, res) => {
  Evaluation.findByIdAndDelete(req.params.id)
    .then((evaluation) => {
      res.status(200).json({ message: 'result deleted successfuly' })
    })
    .catch((error) =>
      res.status(500).json({ message: 'can not delete this result' }),
    )
})

module.exports = router
