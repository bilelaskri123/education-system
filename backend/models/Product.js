const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
