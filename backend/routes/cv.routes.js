const express = require("express");
const checkAuth = require("../middleware/check-auth");
const Cv = require("../models/CV");
const router = express.Router();

router.post("", checkAuth, (req, res) => {
  var newCv = new Cv({
    id: req.userData.userId,
    profile: req.body.profile,
    skills: req.body.skills,
    projects: req.body.projects,
    langues: req.body.langues,
  });
  newCv
    .save()
    .then((data) => {
      res.status(200).json({ message: "your cv created successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "an error occurred cv not saved" });
    });
});

router.get("/detail", checkAuth, (req, res) => {
  Cv.find({ id: req.userData.userId })
    .then((cvData) => {
      res.status(200).send(cvData);
    })
    .catch((error) => res.status(500).json({ message: "fetching cv failed!" }));
});

router.put("/change-cv", checkAuth, (req, res) => {
  userId = req.userData.userId;
});

router.delete("path", (req, res) => {
  return;
});

module.exports = router;
