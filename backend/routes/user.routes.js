const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");

const User = require("../models/User");
const checkAuth = require("../middleware/check-auth");
const multer = require("multer");

router.post("/login", async (req, res, next) => {
  // console.log(req.body);
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
  // console.log(user);
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

router.get("/detail", checkAuth, (req, res, next) => {
  User.findById(req.userData.userId)
    .then((user) => {
      res.status(200).json(_.pick(user, ["fullName", "role", "image"]));
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

router.get("/:id", checkAuth, (req, res) => {
  User.findById(req.params.id)
    .then((userData) => {
      res
        .status(200)
        .json(
          _.pick(userData, [
            "_id",
            "fullName",
            "email",
            "emailParent",
            "section",
            "group",
            "payement",
          ])
        );
    })
    .catch((error) => {
      res.status(500).json({
        message: "fetching user failed",
      });
    });
});

// change password function

router.post("/change-password", checkAuth, async (req, res) => {
  const userId = req.userData.userId;
  let user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "invalid password",
    });
  }

  const checkPassword = await bcrypt.compare(req.body.current, user.password);

  if (!checkPassword) {
    return res.status(404).json({
      message: "Invalid password",
    });
  }

  const saltRounds = 10;
  let salt = await bcrypt.genSalt(saltRounds);
  newPassword = await bcrypt.hash(req.body.newPW, salt);

  user.password = newPassword;
  user
    .save()
    .then(() => {
      res.status(200).json({ message: "password changed with success" });
    })
    .catch((error) =>
      res.status(500).json({ message: "change password failed" })
    );
});

module.exports = router;
