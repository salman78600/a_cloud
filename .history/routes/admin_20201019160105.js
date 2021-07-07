var express = require('express');
var router = express.Router();
const User = require('../models/user')
const Report = require('../models/report')
const Shop = require('../models/shop')
const Feedback = require('../models/feedback')
const Review = require('../models/review')


/* dashboard home . */
router.post('/home', async function(req, res, next) {
    var report = await Report.find();
    var feedback = await Feedback.find();
    var review = await Review.find();
    var shop = await Shop.find();
    var user = await User.find();
    res.json({
        message: 'success',
        report: report.length,
        feedback: feedback.length,
        review: review.length,
        shop: shop.length,
        user: user.length,
    });

});




module.exports = router;