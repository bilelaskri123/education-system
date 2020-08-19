const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  auther: { type: String, required: true },
  pages: { type: Number, required: true },
  copies: { type: Number, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
