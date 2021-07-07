const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    description: Number,
    days: String,
    type: String,
    status: String
})
module.exports = mongoose.model('packages', schema)