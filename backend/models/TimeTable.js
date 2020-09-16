const mongoose = require("mongoose");

const timeTableSchema = mongoose.Schema({
  group: { type: mongoose.Types.ObjectId, ref: "Group" },
  name: { type: String },
});

module.exports = mongoose.model("TimeTable", timeTableSchema);
