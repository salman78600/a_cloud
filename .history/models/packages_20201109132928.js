const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    description: String,
    days: Number,
    type: String,
    status: String
})
module.exports = mongoose.model('packages', schema)