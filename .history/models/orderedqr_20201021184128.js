const mongoose = require('mongoose')

const schema = mongoose.Schema({
    status: String,
    file: String,
    value: String,
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "shop" },
})
module.exports = mongoose.model('orderedqr', schema)