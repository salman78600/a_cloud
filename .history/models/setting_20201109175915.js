const mongoose = require('mongoose')

const schema = mongoose.Schema({

    android: String,
    ios: String
})
module.exports = mongoose.model('setting', schema)