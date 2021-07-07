const mongoose = require('mongoose')

const schema = mongoose.Schema({
    message: {
        type: String,
    },
    date: Date,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true })
module.exports = mongoose.model('coment', schema)