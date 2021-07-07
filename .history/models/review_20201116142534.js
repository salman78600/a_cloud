const mongoose = require('mongoose')

const schema = mongoose.Schema({
    stars: {
        type: Number,
    },
    message: String,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true })
module.exports = mongoose.model('review', schema)