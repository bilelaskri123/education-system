const mongoose = require("mongoose");
const evaluationSchema = mongoose.Schema({
  section: { type: mongoose.Types.ObjectId, required: true },
  groupe: { type: mongoose.Types.ObjectId, ref: "Group", required: true },
  subject: { type: mongoose.Types.ObjectId, ref: "Subject", required: true },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Evaluation", evaluationSchema);
