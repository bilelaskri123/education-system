const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  hours: { type: Number, required: true },
  prix: { type: Number, default: 0 },
  local: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model("Section", sectionSchema);
