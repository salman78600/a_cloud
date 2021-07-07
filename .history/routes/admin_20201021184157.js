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
const Variable = require('../models/variable')
const Orderedqr = require('../models/orderedqr')


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






/* Dashboard  Variables ========= Start */
router.get('/variable/all', async function(req, res, next) {
    var color = await Variable.find({ type: 'color' }).populate("category subcategory")
    var size = await Variable.find({ type: 'size' }).populate("category subcategory")
    res.json({
        message: 'success',
        color: color,
        size: size
    });
});
router.post('/variable/bysubcat', async function(req, res, next) {
    var color = await Variable.find({ type: 'color', subcategory: req.body.subcatId }).populate("category subcategory")
    var size = await Variable.find({ type: 'size', subcategory: req.body.subcatId }).populate("category subcategory")
    res.json({
        message: 'success',
        color: color,
        size: size
    });
});

router.post('/variable/create', async function(req, res, next) {
    Variable.create({
        name: req.body.name,
        value: req.body.value,
        type: req.body.type,
        category: req.body.catId,
        subcategory: req.body.subcatId,
    }).then(r => {
        res.json({
            message: 'success',
        });
    });
});

router.post('/variable/update', async function(req, res, next) {

    Variable.updateOne({ _id: req.body.id }, {
        $set: {
            name: req.body.name,
            value: req.body.value,
            type: req.body.type,
            category: req.body.catId,
            subcategory: req.body.subcatId,
        }
    }).then(r => {
        res.json({
            message: 'success',
        });
    });
});

router.post('/variable/delete', async function(req, res, next) {
    await Variable.deleteOne({ _id: req.body.id })
    res.json({
        message: 'Successfully deleted',
    });
});
/* Dashboard  Variables ========= End */







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
        address: '',
        country: '',
        city: '',
        latitude: '',
        longitude: '',
        qrKey: '',
        phone: req.body.phone,
        views: 0,
        scanned: 0,
        adminFeature: 0,
        shopFeature: 0,
        image: '',
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
            phone: req.body.phone,
            adminFeature: req.body.adminFeature,
            shopFeature: req.body.shopFeature,
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
    await Product.delete({ shop: req.body.id })
    await Shop.deleteOne({ _id: req.body.id })
    res.json({
        message: 'Successfully deleted',
    });
});
/* Dashboard  Shop ========= End */




/* Dashboard  Product ========= Start */
router.get('/product/all', async function(req, res, next) {
    var product = await Product.find().populate("shop subcategory category variable")
    res.json({
        message: 'success',
        data: product
    });
});

router.post('/product/byshopId', async function(req, res, next) {
    var product = await Product.find({ shop: req.body.shopId }).populate("shop subcategory category variable")
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
        brand: req.body.brand,
        images: req.body.images,
        views: req.body.views,
        adminFeature: 0,
        shopFeature: 0,
        shares: 0,
        totalFav: 0,
        status: '1',
        category: req.body.catId,
        variable: req.body.variableIds,
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
            price: req.body.price,
            description: req.body.description,
            brand: req.body.brand,
            adminFeature: req.body.adminFeature,
            shopFeature: req.body.shopFeature,
            status: req.body.status,
            variable: req.body.variableIds,
            category: req.body.catId,
            subcategory: req.body.subcatId,
            shop: req.body.shopId,
            variable: req.body.variableIds
        }
    }).then(r => {
        res.json({
            message: 'success',
        });
    });
});

router.post('/product/updateImages', async function(req, res, next) {
    Product.updateOne({ _id: req.body.id }, {
        $set: {
            images: req.body.images,
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








/* Dashboard  Product ========= Start */
router.get('/orderedqr/all', async function(req, res, next) {
    var fetch = await Orderedqr.find().populate("shop")
    res.json({
        message: 'success',
        data: fetch
    });
});

router.post('/orderedqr/create', function(req, res, next) {
    Orderedqr.create({
        status: 'pending',
        value: '',
        file: '',
        shop: req.body.shopId
    }).then(r => {
        res.json({
            message: 'success',
        });
    });
});

router.post('/orderedqr/update', async function(req, res, next) {
    Orderedqr.updateOne({ _id: req.body.id }, {
        $set: {
            status: 'pending',
            value: '',
            file: '',
            shop: req.body.shopId
        }
    }).then(r => {
        res.json({
            message: 'success',
        });
    });
});

router.post('/orderedqr/delete', async function(req, res, next) {
    await Orderedqr.deleteOne({ _id: req.body.id })
    res.json({
        message: 'Successfully deleted',
    });
});
/* Dashboard  Product ========= End */






// single uploadImage
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
// multi uploadImage
router.post('/multiplefiles', function(req, res, next) {
    uploadd(req, res, function(err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        let filename = req.files;
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
// single file
var upload = multer({ //multer settings
    storage: storage
}).single('file');
// multiple files
var uploadd = multer({ //multer settings
    storage: storage
}).array('files');