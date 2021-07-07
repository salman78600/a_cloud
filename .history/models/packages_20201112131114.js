const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    description: String,
    days: Number,
    credits: Number,
    price: Number,
    type: String,
    status: String
}, { timestamps: true })
module.exports = mongoose.model('packages', schema)