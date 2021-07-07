const mongoose = require('mongoose')

const schema = mongoose.Schema({
    topic: String,
    message: String,
    status: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true })
module.exports = mongoose.model('contactUs', schema)