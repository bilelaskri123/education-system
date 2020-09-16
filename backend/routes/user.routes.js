const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");

const User = require("../models/User");

router.post("/login", async (req, res, next) => {
  console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
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
  console.log(user);
  res.json({
    message: "login successfuly",
    token: token,
    expiresIn: 3600,
    userId: user._id,
    role: user.role,
    fullName: user.fullName,
  });
});

router.get("/users", (req, res) => {
  let updatedUsers = [];
  let newUser = {};
  User.find({ role: { $in: ["student", "teacher"] } })
    .then((users) => {
      users.forEach((user) => {
        newUser.id = user._id;
        newUser.fullName = user.fullName;
        newUser.email = user.email;
        newUser.role = user.role;

        updatedUsers.push(newUser);

        newUser = {};
      });
      res.status(200).send(updatedUsers);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
