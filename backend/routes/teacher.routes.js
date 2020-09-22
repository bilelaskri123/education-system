const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const router = express.Router();

const User = require("../models/User");

router.post("", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(409).json({
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
        "<h3> your account successfully created on education system application !!</h3> <br><br><strong> Email:</strong> " +
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

router.get("/all", (req, res) => {
  teachersUpdated = [];
  teacher = {};
  User.find({ role: "teacher" })
    .then(async (teachers) => {
      await teachers.forEach((data) => {
        teacher.fullName = data.fullName;
        teacher.email = data.email;
        teacher._id = data._id;

        teachersUpdated.push(teacher);
        teacher = {};
      });
      res.status(200).send(teachersUpdated);
    })
    .catch((err) => {
      res.status(500).json({
        message: "fetching teachers failed",
      });
    });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      res
        .status(200)
        .json(
          _.pick(data, [
            "fullName",
            "_id",
            "email",
            "role",
            "salary",
            "speciality",
          ])
        );
    })
    .catch((error) => {
      res.status(500).json({
        message: "can't fetching teacher data",
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
        message: "fetching teachers failed",
      });
    });
});

router.put("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((teacher) => {
      teacher.fullName = req.body.fullName;
      teacher.email = req.body.email;
      teacher.speciality = req.body.speciality;
      teacher.salary = req.body.salary;

      teacher
        .save()
        .then((data) => {
          res.status(201).json({
            message: "teacher updated successfuly!",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "updating teacher failed!",
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "fetching teacher failed!",
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
