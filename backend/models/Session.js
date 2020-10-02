const mongoose = require("mongoose");
const sessionSchema = mongoose.Schema({
  section: {},
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  level: { type: Number, required: true },
  program: {},
  timeTable: {},
});

module.exports = mongoose.model("Session", sessionSchema);
