const mongoose = require('mongoose')

const schema = mongoose.Schema({
    topic: String,
    message: String,
    status: String,
    createdAt: { type: Date, required: true, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
})
module.exports = mongoose.model('contactUs', schema)