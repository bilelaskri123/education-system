const mongoose = require("mongoose");

const programSchema = mongoose.Schema({
  section: { type: mongoose.Types.ObjectId, ref: "Section" },
  level: { type: Number, required: true },
  lessons: [{ type: mongoose.Types.ObjectId, ref: "Subject" }],
});

module.exports = mongoose.model("Program", programSchema);
