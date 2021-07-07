const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
    },
    value: String,
    type: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "subcategory" },
}, { timestamps: true })
module.exports = mongoose.model('variable', schema)