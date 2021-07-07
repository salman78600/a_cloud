const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
    },
    address: String,
    country: String,
    city: String,
    qrKey: String,
    latitude: String,
    longitude: String,
    phone: String,
    views: String,
    scanned: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    image: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
})
module.exports = mongoose.model('shop', schema)