const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

router.post("", (req, res) => {
  const message = new Message({
    Name: req.body.Name,
    userName: req.body.userName,
    email: req.body.email,
    message: req.body.message,
    room: req.body.room,
    date: req.body.date,
    time: req.body.time,
  });
  message.save(function (err, newUser) {
    if (err) {
      res.json(err);
    } else {
      console.log("New Messaged saved in DataBase!!");
    }
  });
});

router.get("/messages/:room1", function (req, res) {
  Message.find({ room: req.params.room1 }, function (err, events) {
    if (err) {
      res.json(err);
    } else {
      res.json(events);
    }
  });
});

module.exports = router;
