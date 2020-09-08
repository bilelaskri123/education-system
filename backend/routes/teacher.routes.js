const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const router = express.Router();

const User = require("../models/User");

router.post("", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(404).json({
      message: "teacher already exist",
    });
  }

  user = new User(
    _.pick(req.body, [
      "fullName",
      "email",
      "password",
      "role",
      "salary",
      "speciality",
    ])
  );
  const saltRounds = 10;
  let salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save().then((userCreated) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "askribilel123@gmail.com",
        pass: "bilel123express#",
      },
    });
    const email = req.body.email;
    var mailOptions = {
      from: "bilel123express#",
      to: email,
      subject: "Account Created Successfuly!!",
      html:
        "<h3> your account successfully created on Chat-App!!</h3> <br><br><strong> Email:</strong> " +
        req.body.email +
        "<br><strong> Password:</strong> " +
        req.body.password +
        "<br><strong> Role:</strong> " +
        req.body.role,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent" + info.response);
      }
    });
    res.status(201).json({
      message: "teacher created",
      user: _.pick(userCreated, [
        "_id",
        "fullName",
        "email",
        "role",
        "salary",
        "speciality",
      ]),
    });
  });
});

router.get("", (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const librarianQuery = User.find({ role: "teacher" });
  let count;
  User.countDocuments({ role: "teacher" }).then((result) => {
    count = result;
  });
  let teachers = [];
  let teacher = {};
  if (pageSize && currentPage) {
    librarianQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  librarianQuery
    .then((result) => {
      result.forEach((data) => {
        teacher.fullName = data.fullName;
        teacher.email = data.email;
        teacher.speciality = data.speciality;
        teacher.role = data.role;
        teacher.salary = data.salary;
        teacher._id = data._id;

        teachers.push(teacher);
        teacher = {};
      });
      res.status(200).json({
        message: "Teacher fetched successfuly!",
        count: count,
        teachers: teachers,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "teacher deleted successfuly",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
