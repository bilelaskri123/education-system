const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  Name: { type: String },
  useName: { type: String },
  email: { type: String },
  message: { type: String },
  room: { type: String },
  date: { type: String },
  time: { type: String },
})

module.exports = mongoose.model('messages', messageSchema)
