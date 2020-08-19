const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema({
  name: { type: String, required: true },
  hours: { type: Number, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model("Section", sectionSchema);
