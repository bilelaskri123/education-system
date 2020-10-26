const mongoose = require('mongoose')

const attandanceSchema = mongoose.Schema({
  section: { type: mongoose.Types.ObjectId, ref: 'Section', required: true },
  group: { type: mongoose.Types.ObjectId, ref: 'Group', required: true },
  lesson: { type: mongoose.Types.ObjectId, ref: 'Subject', required: true },
  students: [{ fullName: String, email: String, absent: Boolean }],
  date: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Attandance', attandanceSchema)
