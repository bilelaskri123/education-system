const express = require('express')
const router = express.Router()
const Group = require('../models/Group')

router.post('', (req, res) => {
  const group = new Group({
    name: req.body.name,
    section: req.body.section,
    level: parseInt(req.body.level),
  })

  console.log(group)
  group
    .save()
    .then((group) => {
      res.status(200).json({
        message: 'group created successfuly',
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'failed to added this group',
      })
    })
})

router.get('', (req, res) => {
  const pageSize = +req.query.pagesize
  const currentPage = +req.query.page
  const groupQuery = Group.find()
    .select('name section students level')
    .populate('section', '_id name')
    .populate('students', '_id fullName email')
  let fetchedGroups

  if (pageSize && currentPage) {
    groupQuery.skip(pageSize * (currentPage - 1)).limit(pageSize)
  }
  groupQuery
    .then((documents) => {
      fetchedGroups = documents
      return Group.countDocuments()
    })
    .then((count) => {
      res.status(200).json({
        message: 'Group fetched successfully!',
        groups: fetchedGroups,
        maxGroup: count,
      })
    })
})

router.get('/all', (req, res) => {
  Group.find({ hasTable: false })
    .populate('section', 'name -_id')
    .then((groups) => {
      res.status(200).send(groups)
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      })
    })
})

router.put('/push/:id', (req, res) => {
  const newStudents = req.body.students
  Group.findById(req.params.id)
    .then((group) => {
      for (i = 0; i < newStudents.length; i++) {
        if (group.students.indexOf(newStudents[i]) == -1) {
          group.students.push(newStudents[i])
        }
      }
      group
        .save()
        .then((newGroup) => {
          res.status(200).json({
            message: 'students added successfuly',
          })
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          })
        })
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      })
    })
})

router.delete('/:id', (req, res) => {
  Group.deleteOne({ _id: req.params.id }).then((group) => {
    res.status(200).json({
      message: `${group.name} deleted successfuly`,
    })
  })
})

module.exports = router
