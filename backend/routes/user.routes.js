const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");

const User = require("../models/User");

router.post("/signup", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(404).json({
      message: "user already exist",
    });
  }

  user = new User(_.pick(req.body, ["fullName", "email", "password", "role"]));
  const saltRounds = 10;
  let salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save().then((userCreated) => {
    res.status(201).json({
      message: "user created",
      user: _.pick(userCreated, ["_id", "fullName", "email", "role"]),
    });
  });
});

router.post("/login", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json({
      message: "invalid email or password",
    });
  }

  const checkPassword = await bcrypt.compare(req.body.password, user.password);

  if (!checkPassword) {
    return res.status(404).json({
      message: "Invalid email or password",
    });
  }

  const token = user.generateTokens();
  res.json({
    message: "login successfuly",
    token: token,
    expiresIn: 3600,
    userId: user._id,
    role: user.role,
  });
});

router.get("/students", (req, res) => {
  let students = [];
  let student = {};
  User.find({ role: "student" })
    .then((result) => {
      result.map((data) => {
        student.fullName = data.fullName;
        student.email = data.email;
        student.role = data.role;

        students.push(student);
      });
      res.status(200).json({ students: students });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/teachers", (req, res) => {
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

router.get("/parents", (req, res) => {
  let parents = [];
  let parent = {};
  User.find({ role: "parent" })
    .then((result) => {
      result.map((data) => {
        parent.fullName = data.fullName;
        parent.email = data.email;
        parent.role = data.role;

        parents.push(parent);
      });
      res.status(200).json({ parents: parents });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/accountants", (req, res) => {
  let accountants = [];
  let accountant = {};
  User.find({ role: "accountant" })
    .then((result) => {
      result.map((data) => {
        accountant.fullName = data.fullName;
        accountant.email = data.email;
        accountant.role = data.role;

        accountants.push(parent);
      });
      res.status(200).json({ accountants: accountants });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/librarians", (req, res) => {
  let librarians = [];
  let librarian = {};
  User.find({ role: "accountant" })
    .then((result) => {
      result.map((data) => {
        librarian.fullName = data.fullName;
        librarian.email = data.email;
        librarian.role = data.role;

        librarians.push(parent);
      });
      res.status(200).json({ librarians: librarians });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
