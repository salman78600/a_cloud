var express = require('express');
var router = express.Router();
var multer = require('multer');
// Models
const User = require('../models/user')
const Report = require('../models/report')
const Shop = require('../models/shop')
const Feedback = require('../models/feedback')
const Review = require('../models/review')
const Product = require('../models/product')
const Category = require('../models/category')
const Subcategory = require('../models/subcategory')


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
router.get('/category/all', async function(req, res, next) {
    var cat = await Category.find()
    res.json({
        message: 'success',
        data: cat
    });
});

router.post('/category/create', async function(req, res, next) {
    var checker = await Category.findOne({ name: req.body.name })
    if (checker == null) {
        Category.create({
            name: req.body.name,
            image: req.body.image,
        }).then(r => {
            Category.find().then(field => {
                res.json({
                    message: 'success',
                    data: field
                });
            });
        });
    } else {
        res.json({
            message: 'Category already exist',
        });
    }
});

router.post('/category/update', async function(req, res, next) {
    var checker = await Category.find({ name: req.body.name })
    if (checker.length <= 1) {
        Category.updateOne({ _id: req.body.id }, { $set: { name: req.body.name, image: req.body.image } }).then(r => {
            Category.find().then(field => {
                res.json({
                    message: 'success',
                    data: field
                });
            });
        });
    } else {
        res.json({
            message: 'Category already exist',
        });
    }
});

router.post('/category/delete', async function(req, res, next) {
    await Category.deleteOne({ _id: req.body.id })
    res.json({
        message: 'Successfully deleted',
    });
});
/* Dashboard  Category ========= End */







/* Dashboard  Sub Category ========= Start */
router.post('/subcategory/all', async function(req, res, next) {
    var cat = await Subcategory.find({ category: req.body.id })
    res.json({
        message: 'success',
        data: cat
    });
});

router.post('/subcategory/create', async function(req, res, next) {
    var checker = await Subcategory.findOne({ name: req.body.name })
    if (checker == null) {
        Subcategory.create({
            name: req.body.name,
            image: req.body.image,
            category: req.body.id,
        }).then(r => {
            Subcategory.find().then(field => {
                res.json({
                    message: 'success',
                    data: field
                });
            });
        });
    } else {
        res.json({
            message: 'Category already exist',
        });
    }
});

router.post('/subcategory/update', async function(req, res, next) {
    var checker = await Subcategory.find({ name: req.body.name })
    if (checker.length <= 1) {
        Subcategory.updateOne({ _id: req.body.id }, { $set: { name: req.body.name, image: req.body.image } }).then(r => {
            Subcategory.find().then(field => {
                res.json({
                    message: 'success',
                    data: field
                });
            });
        });
    } else {
        res.json({
            message: 'Category already exist',
        });
    }
});

router.post('/subcategory/delete', async function(req, res, next) {
    await Subcategory.deleteOne({ _id: req.body.id })
    res.json({
        message: 'Successfully deleted',
    });
});
/* Dashboard  Sub Category ========= End */










/* Dashboard  Shop ========= Start */
router.get('/shop/all', async function(req, res, next) {
    var cat = await Shop.find()
    res.json({
        message: 'success',
        data: cat
    });
});

router.post('/shop/create', async function(req, res, next) {
    var checker = await Shop.findOne({ name: req.body.name })
    if (checker == null) {
        Shop.create({
            name: req.body.name,
            image: req.body.image,
        }).then(r => {
            Shop.find().then(field => {
                res.json({
                    message: 'success',
                    data: field
                });
            });
        });
    } else {
        res.json({
            message: 'Category already exist',
        });
    }
});

router.post('/shop/update', async function(req, res, next) {
    var checker = await Shop.find({ name: req.body.name })
    if (checker.length <= 1) {
        Shop.updateOne({ _id: req.body.id }, { $set: { name: req.body.name, image: req.body.image } }).then(r => {
            Shop.find().then(field => {
                res.json({
                    message: 'success',
                    data: field
                });
            });
        });
    } else {
        res.json({
            message: 'Category already exist',
        });
    }
});

router.post('/shop/delete', async function(req, res, next) {
    await Shop.deleteOne({ _id: req.body.id })
    res.json({
        message: 'Successfully deleted',
    });
});
/* Dashboard  Shop ========= End */









// uploadImage
router.post('/uploadImage', function(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        let filename = req.file.filename;
        res.json(filename);
    });
});

module.exports = router;

// multar =========================================================
// ================================================================
// ================================================================
// ================================================================
// ================================================================
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
var upload = multer({ //multer settings
    storage: storage
}).single('file');