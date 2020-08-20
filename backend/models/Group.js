const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  name: { type: String, require: true },
  students: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
});

module.exports = mongoose.model("Group", groupSchema);
