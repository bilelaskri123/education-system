const mongoose = require("mongoose");
const evaluationSchema = mongoose.Schema({
  section: { type: mongoose.Types.ObjectId, required: true },
  group: { type: mongoose.Types.ObjectId, ref: "Group", required: true },
  lesson: { type: mongoose.Types.ObjectId, ref: "Subject", required: true },
  students: [{fullName: String, email: String, note: Number}],
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Evaluation", evaluationSchema);
