const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");

const User = require("../models/User");

router.post("/parent", async (req, res, next) => {
  console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(404).json({
      message: "user already exist",
    });
  }

  user = new User(
    _.pick(req.body, ["fullName", "email", "password", "role", "childEmail"])
  );
  const saltRounds = 10;
  let salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save().then((userCreated) => {
    res.status(201).json({
      message: "user created",
      user: _.pick(userCreated, [
        "_id",
        "fullName",
        "email",
        "role",
        "childEmail",
      ]),
    });
  });
});

router.post("/student", (req, res) => {
  console.log(req.body);
  res.status(201).send(req.body);
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

module.exports = router;
