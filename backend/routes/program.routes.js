const express = require("express");
const router = express.Router();

const Program = require("../models/Program");

router.post("", (req, res) => {
  let program = new Program({
    section: req.body.section,
    level: req.body.level,
    lessons: req.body.lessons,
  });

  program
    .save()
    .then(() => {
      res.status(200).json({
        message: "programm created successfuly",
      });
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
  const programQuery = Program.find()
    .populate("section", "name")
    .populate("lessons", "");
  let fetchedProgram;
  let programs = [];
  let program = {};
  if (pageSize && currentPage) {
    programQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  programQuery
    .then((documents) => {
      fetchedProgram = documents;
      return Program.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Program fetched successfully!",
        programs: fetchedProgram,
        maxPrograms: count,
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
  let newProgram = {};
  Program.findById(req.params.id)
    .populate("section", "name")
    .populate("lessons", "-teachers")
    .then((program) => {
      // newProgram.id = program._id;
      // newProgram.name = program.section.name;
      // newProgram.level = program.level;
      // newProgram.lessons = subject.lessons;
      res.status(200).send(program);
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

router.put("/:id", (req, res) => {
  Program.findByIdAndUpdate(req.params.id, req.body)
    .then((newProgram) => {
      res.status(201).json({
        message: "Program updated successfuly",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  Program.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "program deleted successfuly",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

module.exports = router;
