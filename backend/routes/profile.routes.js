const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../models/User");
const checkAuth = require("../middleware/check-auth");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.put("/:id", multer({ storage: storage }).single("image"), (req, res) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  User.findById(req.params.id)
    .then((profile) => {
      profile.fullName = req.body.fullName;
      profile.adress = req.body.adress;
      profile.birdhday = req.body.birdhday;
      profile.phone = req.body.phone;
      profile.linkedin = req.body.linkedin;
      profile.image = imagePath;

      profile
        .save()
        .then((data) => {
          res.status(200).json({
            message: "profile updated successfuly",
          });
        })
        .catch((error) =>
          res.status(500).json({ message: "updating profile failed" })
        );
    })
    .catch((error) =>
      res.status(500).json({
        message: "profile not found",
      })
    );
});

router.get("/pro", checkAuth, (req, res) => {
  let userId = req.userData.userId;
  User.findOne({ _id: userId })
    .select("_id fullName email role adress birdhday phone linkedin image")
    .then((profile) => {
      res.status(200).json({ profile: profile });
    })
    .catch((error) => {
      res.status(500).json({
        message: "canno't find your data",
      });
    });
});

module.exports = router;
