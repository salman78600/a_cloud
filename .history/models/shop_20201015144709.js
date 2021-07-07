const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: {
    type: String,
  },
  address: String,
  qrKey: String,
  latitude: String,
  longitude: String,
  phone: String,
  views: String,
  scanned: String,
  shopType: {type: mongoose.Schema.Types.ObjectId, ref: "shopType"},
  image: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
})
module.exports = mongoose.model('shop', schema)
