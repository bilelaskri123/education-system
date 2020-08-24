const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  group: { type: mongoose.Types.ObjectId, ref: "Group", required: true },
  courses: [{ type: String }],
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Course", courseSchema);
