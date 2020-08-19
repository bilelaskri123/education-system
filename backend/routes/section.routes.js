const express = require("express");
const router = express.Router();
const multer = require("multer");
const Section = require("../models/Section");

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

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const section = new Section({
      name: req.body.name,
      hours: parseInt(req.body.hours),
      description: req.body.description,
      imagePath: url + "/images/" + req.file.filename,
    });
    console.log(section);
    section.save().then((createdSection) => {
      res.status(201).json({
        message: "section added successfuly",
        section: {
          ...createdSection,
          id: createdSection._id,
        },
      });
    });
  }
);

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const section = new Section({
      _id: req.params.id,
      name: req.body.name,
      hours: parseInt(req.body.hours),
      description: req.body.description,
      imagePath: imagePath,
    });
    Section.updateOne({ _id: req.params.id }, section).then((result) => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("/:id", (req, res, next) => {
  Section.findById(req.params.id).then((section) => {
    if (section) {
      res.status(200).json(section);
    } else {
      res.status(404).json({ message: "section not found" });
    }
  });
});

router.get("", (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const sectionQuery = Section.find();
  let fetchedSections;
  if (pageSize && currentPage) {
    sectionQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  sectionQuery
    .then((documents) => {
      fetchedSections = documents;
      return Section.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Section fetched successfully!",
        sections: fetchedSections,
        maxSection: count,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Section.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "section deleted" });
  });
});

module.exports = router;
