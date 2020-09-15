const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  subject: { type: mongoose.Types.ObjectId, ref: "Subject", required: true },
  courses: [{ type: String, required: true }],
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Course", courseSchema);
