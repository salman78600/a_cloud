const mongoose = require('mongoose')

const schema = mongoose.Schema({
  message: {
    type: String,
  },
  status: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
})
module.exports = mongoose.model('feedback', schema)
