const mongoose = require('mongoose')

const schema = mongoose.Schema({
    username: {
        type: String,
    },
    phone: String,
    countryCode: String,
    password: String,
    email: String,
    fullName: String,
    image: String,
    status: String,
    active: Boolean,
    lastLogin: Date,
    lastIp: String,
    showNotif: Boolean,
    role: String,
    fcmTokens: [{
        fcmToken: String,
        deviceType: String,
    }, ],
    favShops: [{
        shop: { type: mongoose.Schema.Types.ObjectId, ref: 'shop' },
    }, ],
    wishlist: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    }, ],
    deleted_at: {
        type: Date,
        default: null,
    },
    history: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    }, ],
})
module.exports = mongoose.model('user', schema)