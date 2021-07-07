const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
    },
    price: String,
    description: String,
    brand: String,
    images: [{ type: String }],
    views: Number,
    adminFeature: Number,
    shopFeature: Number,
    shares: Number,
    totalFav: Number,
    status: Boolean,
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'shop' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategory' },
})
module.exports = mongoose.model('product', schema)