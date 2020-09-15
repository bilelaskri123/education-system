const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const multer = require("multer");

router.post("/", (req, res) => {
  const subject = new Subject({
    name: req.body.name,
    description: req.body.description,
    coefficient: req.body.coefficient,
    teachers: req.body.teachers,
  });

  subject
    .save()
    .then(() => {
      res.status(201).json({
        message: "subject created successfuly",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/all", (req, res) => {
  Subject.find()
    .populate("teachers", "fullName")
    .then((lessons) => {
      res.status(200).send(lessons);
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const subjectQuery = Subject.find().populate("teachers", "fullName -_id");
  let fetchedSubjects;
  let subjects = [];
  let subject = {};
  if (pageSize && currentPage) {
    subjectQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  subjectQuery
    .then((documents) => {
      fetchedSubjects = documents;
      return Subject.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Subjects fetched successfully!",
        subjects: fetchedSubjects,
        maxSubjects: count,
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  let newSubject = {};
  Subject.findById(req.params.id)
    .populate("teachers", "fullName _id")
    .then((subject) => {
      newSubject.id = subject._id;
      newSubject.name = subject.name;
      newSubject.coefficient = subject.coefficient;
      newSubject.description = subject.description;
      newSubject.teachers = subject.teachers;
      res.status(200).send(newSubject);
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

router.delete("/:id", (req, res) => {
  Subject.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Subject deleted successfuly",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

router.put("/:id", (req, res) => {
  Subject.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
  })
    .then(() => {
      res.status(201).json({
        message: "subject updated successfuly",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

module.exports = router;
