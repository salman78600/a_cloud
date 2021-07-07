const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
    },
    price: String,
    description: String,
    images: [{ filename: String }],
    views: Number,
    shares: Number,
    totalFav: Number,
    sale: String,
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'shop' },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategory' },
})
module.exports = mongoose.model('product', schema)