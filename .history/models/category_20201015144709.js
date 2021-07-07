const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: {
    type: String,
  },
  parent: {type: mongoose.Schema.Types.ObjectId, ref: "category"},
})
module.exports = mongoose.model('category', schema)
