const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  name: { type: String, require: true, unique: true },
  section: { type: mongoose.Types.ObjectId, ref: "Section" },
  students: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
});

module.exports = mongoose.model("Group", groupSchema);
