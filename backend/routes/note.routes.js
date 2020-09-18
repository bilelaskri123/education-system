const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const Note = require("../models/Note");

router.post("", checkAuth, (req, res) => {
  let note = new Note({
    userId: req.userData.userId,
    title: req.body.title,
    problem: req.body.problem,
    solution: req.body.solution,
  });

  note
    .save()
    .then((data) => {
      res.status(200).json({
        message: "note created successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

router.get("", (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const noteQuery = Note.find().populate("userId", "fullName");
  let count;
  Note.countDocuments().then((result) => {
    count = result;
  });
  if (pageSize && currentPage) {
    noteQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  noteQuery
    .then((notes) => {
      res.status(200).json({
        message: "notes fetched successfuly!",
        count: count,
        notes: notes,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.put("path", (req, res) => {
  return;
});

router.delete("/:id", (req, res) => {
  Note.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
        message: "note deleted successfuly",
      });
    })
    .catch((error) => {});
});

module.exports = router;
