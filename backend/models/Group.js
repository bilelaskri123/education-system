const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  name: { type: String, require: true },
  section: { type: mongoose.Types.ObjectId, ref: "Section" },
  level: {type: Number, required: true},
  students: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
  hasTable: { type: Boolean, default: false },
});

module.exports = mongoose.model("Group", groupSchema);
