const mongoose = require('mongoose')
const cvSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  profile: { type: String },
  skills: [{ skill: String, level: Number }],
  projects: [{ project: String, description: String }],
  langues: [{ langue: String, level: Number }],
})

module.exports = mongoose.model('Cv', cvSchema)
