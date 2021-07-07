const mongoose = require('mongoose')

const schema = mongoose.Schema({
  message: String,
  date: Date,
  status: String,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
})
module.exports = mongoose.model('review', schema)
