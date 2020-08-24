const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");

const User = require("../models/User");

router.post("", async (req, res, next) => {
  console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(404).json({
      message: "user already exist",
    });
  }

  user = new User(
    _.pick(req.body, ["fullName", "email", "password", "role", "salary"])
  );
  const saltRounds = 10;
  let salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);

  await user
    .save()
    .then((userCreated) => {
      res.status(201).json({
        message: "user created",
        user: _.pick(userCreated, [
          "_id",
          "fullName",
          "email",
          "role",
          "salary",
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
  const accountantQuery = User.find({ role: "accountant" });
  let count;
  User.countDocuments({ role: "accountant" }).then((result) => {
    count = result;
  });
  let accountants = [];
  let accountant = {};
  if (pageSize && currentPage) {
    accountantQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  accountantQuery
    .then((result) => {
      result.forEach((data) => {
        accountant.fullName = data.fullName;
        accountant.email = data.email;
        accountant.role = data.role;
        accountant.salary = data.salary;
        accountant._id = data._id;

        accountants.push(accountant);
        accountant = {};
      });
      res.status(200).json({
        message: "Accountant fetched successfuly!",
        count: count,
        accountants: accountants,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "Accountant deleted successfuly",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;