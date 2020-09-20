const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    default: Date.now,
    required: true,
  },
  end: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
