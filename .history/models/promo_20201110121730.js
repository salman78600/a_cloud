const mongoose = require('mongoose')

const schema = mongoose.Schema({
    image: String,
    days: String,
    link: String,
    title: String,
    description: String,
    status: String
})
module.exports = mongoose.model('promo', schema)