const mongoose = require('mongoose')
const settingSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  paginator: Number,
  score: Number,
  admis: Number,
})

module.exports = mongoose.model('Setting', settingSchema)
