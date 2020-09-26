const express = require("express");
const multer = require("multer");

const Book = require("../models/Book");

const router = express.Router();

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
    const book = new Book({
      title: req.body.title,
      auther: req.body.auther,
      pages: parseInt(req.body.pages),
      copies: parseInt(req.body.copies),
      description: req.body.description,
      imagePath: url + "/images/" + req.file.filename,
    });
    book.save().then((createdBook) => {
      res.status(201).json({
        message: "Book added successfully",
        book: {
          ...createdBook,
          id: createdBook._id,
        },
      });
    });
  }
);

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.image;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const book = new Book({
      _id: req.params.id,
      title: req.body.title,
      auther: req.body.auther,
      pages: parseInt(req.body.pages),
      copies: parseInt(req.body.copies),
      description: req.body.description,
      imagePath: imagePath,
    });
    Book.updateOne({ _id: req.params.id }, book).then((result) => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const bookQuery = Book.find();
  let fetchedBooks;
  if (pageSize && currentPage) {
    bookQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  bookQuery
    .then((documents) => {
      fetchedBooks = documents;
      return Book.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Books fetched successfully!",
        books: fetchedBooks,
        maxBooks: count,
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.get("/free", (req, res) => {
  Book.find({ copies: { $gt: 0 } })
    .then((books) => {
      res.status(200).json({
        books: books,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res, next) => {
  Book.findById(req.params.id).then((book) => {
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Book.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Book deleted!" });
  });
});

module.exports = router;
