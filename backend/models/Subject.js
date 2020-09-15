const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  coefficient: { type: Number, required: true },
  teachers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  courses: [{ type: string }],
});

module.exports = mongoose.model("Subject", subjectSchema);
