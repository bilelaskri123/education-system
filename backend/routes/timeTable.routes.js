const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const TimeTable = require("../models/TimeTable");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

router.post("", upload.single("file"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  let timeTable = new TimeTable({
    group: req.body.group,
    timeTable: req.file.originalname,
  });
  timeTable
    .save()
    .then((data) => {
      res.status(201).json({
        message: "time table created successfuly",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

router.get("", (req, res) => {
  TimeTable.find()
    .populate("group", "name")
    .then((timeTables) => {
      res.status(200).send(timeTables);
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

module.exports = router;
