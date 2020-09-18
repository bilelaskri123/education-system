const mongoose = require("mongoose");
const { stringify } = require("querystring");

const noteSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  problem: { type: String, required: true },
  solution: { type: String, required: true },
});

module.exports = mongoose.model("Note", noteSchema);
