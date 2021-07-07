const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
    },
    address: String,
    country: String,
    city: String,
    latitude: String,
    longitude: String,
    qrKey: String,
    phone: String,
    views: String,
    scanned: String,
    adminFeature: Number,
    shopFeature: Number,
    image: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
})
module.exports = mongoose.model('shop', schema)