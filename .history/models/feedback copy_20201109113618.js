const mongoose = require('mongoose')

const schema = mongoose.Schema({
    topic: String,
    message: String,
    status: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
})
module.exports = mongoose.model('feedback', schema)