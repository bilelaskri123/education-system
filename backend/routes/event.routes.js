const Event = require("../models/Event");
const express = require("express");
const router = express.Router();

router.get("", async (req, res) => {
  await Event.find().then((data) => {
    res.status(200).json(data);
  });
});

router.get("/:id", async (req, res) => {
  const eventID = req.params.id;

  await Event.findById(eventID)
    .then((event) => {
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(400).json("event cannot be found");
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

// Insert new Event
router.post("", async (req, res) => {
  const event = new Event({
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
  });

  await event
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "create event failed!",
      });
    });
});

// Update event by id
router.put("/:id", (req, res) => {
  const eventID = req.params.id;

  const event = {
    _id: eventID,
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
  };

  Event.updateOne({ _id: eventID }, event)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({
        message: "updating event failed",
      });
    });
});

// Delete event by id
router.delete("/:id", (req, res) => {
  const eventID = req.params.id;

  Event.deleteOne({ _id: eventID })
    .then(() => {
      res.status(201).json("Event has been deleted");
    })
    .catch((err) => {
      res.status(500).json({
        message: "deleting event failed!",
      });
    });
});

module.exports = router;
