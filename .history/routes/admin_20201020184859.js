var express = require('express');
var router = express.Router();
var multer = require('multer');
var passwordHash = require('password-hash');
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
    var cat = await Subcategory.find({ category: req.body.catId })
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
            category: req.body.catId,
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
        Subcategory.updateOne({ _id: req.body.id }, { $set: { name: req.body.name, image: req.body.image, } }).then(r => {
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




/* Dashboard  User ========= Start */
router.get('/user/all', async function(req, res, next) {
    var cat = await User.find()
    res.json({
        message: 'success',
        data: cat
    });
});

router.post('/user/create', async function(req, res, next) {
    User.create({
        username: req.body.username,
        phone: req.body.phone,
        countryCode: req.body.countryCode,
        password: passwordHash.generate(req.body.password),
        email: req.body.email,
        fingerprint: '',
        image: 'avatar.png',
        active: true,
        status: 1,
        showNotif: true,
        role: req.body.role
    }).then(r => {
        res.json({
            message: 'success',
        });
    });
});

router.post('/user/update', async function(req, res, next) {
    if (req.body.oldPhone == req.body.phone) {
        if (req.body.password == '') {
            User.updateOne({ _id: req.body.id }, {
                $set: {
                    username: req.body.username,
                    phone: req.body.phone,
                    countryCode: req.body.countryCode,
                    email: req.body.email,
                    image: req.body.image,
                    active: true,
                    status: 1,
                    showNotif: true,
                    role: req.body.role
                }
            }).then(en => {
                res.json({
                    message: 'success',
                });
            });
        } else {
            User.updateOne({ _id: req.body.id }, {
                $set: {
                    username: req.body.username,
                    phone: req.body.phone,
                    countryCode: req.body.countryCode,
                    password: passwordHash.generate(req.body.password),
                    email: req.body.email,
                    image: req.body.image,
                    active: true,
                    status: 1,
                    showNotif: true,
                    role: req.body.role
                }
            }).then(en => {
                res.json({
                    message: 'success',
                });
            });

        }
    } else {
        User.findOne({ phone: req.body.phone }).then(en => {
            if (en !== null) {
                res.json({ message: 'already' });
            } else {
                if (req.body.password == '') {
                    User.updateOne({ _id: req.body.id }, {
                        $set: {
                            username: req.body.username,
                            phone: req.body.phone,
                            countryCode: req.body.countryCode,
                            email: req.body.email,
                            image: req.body.image,
                            active: true,
                            status: 1,
                            showNotif: true,
                            role: req.body.role
                        }
                    }).then(en => {
                        res.json({
                            message: 'success',
                        });
                    });

                } else {
                    User.updateOne({ _id: req.body.id }, {
                        $set: {
                            username: req.body.username,
                            phone: req.body.phone,
                            countryCode: req.body.countryCode,
                            password: passwordHash.generate(req.body.password),
                            email: req.body.email,
                            image: req.body.image,
                            active: true,
                            status: 1,
                            showNotif: true,
                            role: req.body.role
                        }
                    }).then(en => {
                        res.json({
                            message: 'success',
                        });
                    });
                }
            }
        });

    }

});

router.post('/user/delete', async function(req, res, next) {
    await User.deleteOne({ _id: req.body.id })
    res.json({
        message: 'Successfully deleted',
    });
});
/* Dashboard  User ========= End */






/* Dashboard  Shop ========= Start */
router.get('/shop/all', async function(req, res, next) {
    var cat = await Shop.find().populate("category user")
    res.json({
        message: 'success',
        data: cat
    });
});

router.post('/shop/create', async function(req, res, next) {
    Shop.create({
        name: req.body.name,
        address: req.body.address,
        qrKey: req.body.qrKey,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        phone: req.body.phone,
        views: req.body.image,
        scanned: req.body.scanned,
        category: req.body.catId,
        user: req.body.userId
    }).then(r => {
        res.json({
            message: 'success',
        });
    });
});

router.post('/shop/update', async function(req, res, next) {

    Shop.updateOne({ _id: req.body.id }, {
        $set: {
            name: req.body.name,
            address: req.body.address,
            qrKey: req.body.qrKey,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            phone: req.body.phone,
            views: req.body.image,
            scanned: req.body.scanned,
            category: req.body.catId,
            user: req.body.userId
        }
    }).then(r => {
        res.json({
            message: 'success',
        });
    });
});

router.post('/shop/delete', async function(req, res, next) {
    await Shop.deleteOne({ _id: req.body.id })
    res.json({
        message: 'Successfully deleted',
    });
});
/* Dashboard  Shop ========= End */




/* Dashboard  Product ========= Start */
router.get('/product/all', async function(req, res, next) {
    var product = await Product.find().populate("shop subcategory")
    res.json({
        message: 'success',
        data: product
    });
});

router.post('/product/create', function(req, res, next) {
    Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        images: req.body.images,
        views: req.body.views,
        shares: req.body.shares,
        sale: req.body.sale,
        subcategory: req.body.subcatId,
        shop: req.body.shopId
    }).then(r => {
        res.json({
            message: 'success',
        });
    });
});

router.post('/product/update', async function(req, res, next) {

    Product.updateOne({ _id: req.body.id }, {
        $set: {
            name: req.body.name,
            address: req.body.address,
            qrKey: req.body.qrKey,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            phone: req.body.phone,
            views: req.body.image,
            scanned: req.body.scanned,
            category: req.body.catId,
            user: req.body.userId
        }
    }).then(r => {
        res.json({
            message: 'success',
        });
    });
});

router.post('/product/delete', async function(req, res, next) {
    await Product.deleteOne({ _id: req.body.id })
    res.json({
        message: 'Successfully deleted',
    });
});
/* Dashboard  Product ========= End */




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