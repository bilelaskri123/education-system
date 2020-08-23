const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
  let teachers = [];
  let teacher = {};
  User.find({ role: "teacher" })
    .then((result) => {
      result.map((data) => {
        teacher.fullName = data.fullName;
        teacher.email = data.email;
        teacher.role = data.role;

        teachers.push(teacher);
      });
      res.status(200).json({ teachers: teachers });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
