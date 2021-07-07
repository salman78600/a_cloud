const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
    },
    image: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
}, { timestamps: true })
module.exports = mongoose.model('subcategory', schema)