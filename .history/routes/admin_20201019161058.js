var express = require('express');
var router = express.Router();
const User = require('../models/user')
const Report = require('../models/report')
const Shop = require('../models/shop')
const Feedback = require('../models/feedback')
const Review = require('../models/review')
const Product = require('../models/product')
const Category = require('../models/category')


/* dashboard home page */
router.get('/home', async function(req, res, next) {
    var report = await Report.find();
    var feedback = await Feedback.find();
    var product = await Product.find();
    var review = await Review.find();
    var shop = await Shop.find();
    var user = await User.find();
    res.json({
        message: 'success',
        report: report.length,
        feedback: feedback.length,
        review: review.length,
        product: product.length,
        shop: shop.length,
        user: user.length,
    });

});

/* Dashboard  Category ========= Start */
router.post('/category/create', async function(req, res, next) {
    var checker = await Category.findOne({ name: req.body.name })
    if (checker == null) {
        Category.create({
            name: req.body.name,
            image: req.body.image,
        })
    } else {
        res.json({
            message: 'Category already exist',
        });
    }

});




module.exports = router;