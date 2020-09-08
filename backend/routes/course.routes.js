const express = require("express");
const multer = require("multer");
const router = express.Router();

const Course = require("../models/Course");

// i will complete this partie later

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = file.mimetype.split("/")[1];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

var upload = multer({ storage: storage });

router.post("", upload.array("myFiles", 50), (req, res) => {
  const files = req.files;
  res.send(files);
});

router.get("", (req, res) => {
  return;
});

router.get("/:id", (req, res) => {
  return;
});

router.put("/:id", (req, res) => {
  return;
});

router.delete("/:id", (req, res) => {
  return;
});

module.exports = router;
