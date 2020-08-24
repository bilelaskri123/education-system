const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

const User = require("../models/User");

router.post("", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(404).json({
      message: "librarian already exist",
    });
  }

  user = new User(
    _.pick(req.body, ["fullName", "email", "password", "role", "salary"])
  );
  const saltRounds = 10;
  let salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save().then((userCreated) => {
    res.status(201).json({
      message: "librarian created",
      user: _.pick(userCreated, ["_id", "fullName", "email", "role", "salary"]),
    });
  });
});

router.get("", (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const librarianQuery = User.find({ role: "librarian" });
  let count;
  User.countDocuments({ role: "librarian" }).then((result) => {
    count = result;
  });
  let librarians = [];
  let librarian = {};
  if (pageSize && currentPage) {
    librarianQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  librarianQuery
    .then((result) => {
      result.forEach((data) => {
        librarian.fullName = data.fullName;
        librarian.email = data.email;
        librarian.role = data.role;
        librarian.salary = data.salary;
        librarian._id = data._id;

        librarians.push(librarian);
        librarian = {};
      });
      res.status(200).json({
        message: "Librarian fetched successfuly!",
        count: count,
        librarians: librarians,
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
        message: "Librarian deleted successfuly",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;