const mongoose = require('mongoose')

const schema = mongoose.Schema({
    androidVersion: String,
    iosVersion: String,
    freeCreditOnShopCreate: String,
    creditDeductionOnAddProduct: String,
    creditDeductionOnSendingCustomNotification: String,
    creditDeductionOnPromoteProduct: String,
    promoteProductTime: String,
    creditDeductionOnPromoteShop: String,
    promoteShopTime: String,
    creditAdditionOnVideoAd: String,
    creditAdditionOnQrScan: String,
    termsAndCondition: String,
    privacyPolicy: String
})
module.exports = mongoose.model('setting', schema)