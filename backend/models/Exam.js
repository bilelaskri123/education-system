const mongoose = require("mongoose");

const examSchema = mongoose.Schema({
  group: { type: mongoose.Types.ObjectId, ref: "Group" },
  subject: { type: mongoose.Types.ObjectId, ref: "Subject" },
  examDate: { type: Date },
  startTime: { type: Date },
  endTime: { type: Date },
});

module.exports = mongoose.model("Exam", examSchema);
