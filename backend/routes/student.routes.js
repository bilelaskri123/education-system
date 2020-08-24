const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();

const User = require("../models/User");
const Group = require("../models/Group");

router.post("", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(404).json({
      message: "student already exist",
    });
  }

  user = new User(
    _.pick(req.body, [
      "_id",
      "fullName",
      "email",
      "password",
      "role",
      "emailParent",
      "section",
      "group",
      "payement",
    ])
  );
  const saltRounds = 10;
  let salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);

  console.log(user);

  await Group.findById(user.group)
    .then((group) => {
      if (group.students.indexOf(user._id) == -1) {
        group.students.push(user._id);
      }
      group.save();
    })
    .catch((err) => {
      console.log(err);
    });
  await user
    .save()
    .then((userCreated) => {
      res.status(201).json({
        message: "student created",
        user: _.pick(userCreated, [
          "_id",
          "fullName",
          "email",
          "role",
          "emailParent",
          "section",
          "group",
          "payement",
        ]),
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("", (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const studentQuery = User.find({ role: "student" })
    .populate("section", "name")
    .populate("group", "name");
  let count;
  User.countDocuments({ role: "student" }).then((result) => {
    count = result;
  });
  let students = [];
  let student = {};
  if (pageSize && currentPage) {
    studentQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  studentQuery
    .then((result) => {
      result.forEach((data) => {
        student.fullName = data.fullName;
        student.email = data.email;
        student.role = data.role;
        student.emailParent = data.emailParent;
        student._id = data._id;
        student.section = data.section.name;
        student.group = data.group.name;
        student.payement = data.payement;

        students.push(student);
        student = {};
      });
      console.log(students);
      res.status(200).json({
        message: "student fetched successfuly!",
        count: count,
        students: students,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "parent deleted successfuly",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
