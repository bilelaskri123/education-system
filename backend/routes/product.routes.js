const express = require("express");
const multer = require("multer");

const Product = require("../models/Product");

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
  async (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      stock: parseInt(req.body.stock),
      description: req.body.description,
      imagePath: url + "/images/" + req.file.filename,
    });
    await product
      .save()
      .then((createdProduct) => {
        res.status(201).json({
          message: "Post added successfully",
          product: {
            ...createdProduct,
            id: createdProduct._id,
          },
        });
      })
      .catch((err) => console.log(err));
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
    const product = new Product({
      _id: req.body.id,
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      stock: req.body.stock,
      imagePath: imagePath,
    });
    Product.updateOne({ _id: req.params.id }, product).then((result) => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const productQuery = Product.find();
  let fetchedProducts;
  if (pageSize && currentPage) {
    productQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  productQuery
    .then((documents) => {
      fetchedProducts = documents;
      return Product.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Products fetched successfully!",
        products: fetchedProducts,
        maxProducts: count,
      });
    });
});

router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id).then((product) => {
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Product deleted!" });
  });
});

module.exports = router;
