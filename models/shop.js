const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: String,
    country: String,
    city: String,
    latitude: String,
    longitude: String,
    opentime: String,
    closetime: String,
    qrKey: String,
    phone: String,
    phoneCode: String,
    views: String,
    scanned: String,
    adminFeature: Number,
    shopFeature: Number,
    credits: Number,
    image: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true })
module.exports = mongoose.model('shop', schema)