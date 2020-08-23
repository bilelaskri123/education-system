const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/students", (req, res) => {
  let students = [];
  let student = {};
  User.find({ role: "student" })
    .then((result) => {
      result.forEach((element) => {
        student.fullName = element.fullName;
        student.role = element.role;
        student.email = element.email;

        students.push(student);
        student = {};
      });
      res.status(200).json({ students: students });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
