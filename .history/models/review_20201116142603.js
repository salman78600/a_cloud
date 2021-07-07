const mongoose = require('mongoose')

const schema = mongoose.Schema({
    stars: {
        type: Number,
    },
    message: String,
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'shop' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true })
module.exports = mongoose.model('review', schema)