const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "shop" },
}, { timestamps: true })
module.exports = mongoose.model('scannedshop', schema)