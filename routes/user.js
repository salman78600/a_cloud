var express = require('express');
var router = express.Router();
const User = require('../models/user')
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var config = require('../config');
var multer = require('multer');
const shop = require('../models/shop');
const category = require('../models/category');
const variable = require('../models/variable');
const product = require('../models/product');
const subcategory = require('../models/subcategory');
const feedback = require('../models/feedback');
const contactUs = require('../models/contactUs');
const package = require('../models/packages')
const setting = require('../models/setting')
const scannedshop = require('../models/scannedshop')
var fs = require("fs");
const review = require('../models/review');
const user = require('../models/user');


/* changePassword */
router.post('/changePassword', function (req, res, next) {
    User.findOne({
        _id: req.body.id
    }).then(fetch => {
        if (req.body.old == '') {
            User.updateOne({
                _id: req.body.id
            }, {
                $set: {
                    password: passwordHash.generate(req.body.pass),
                }
            }).then(r => {
                User.findOne({
                    _id: req.body.id
                }).then(fetch => {
                    res.json({
                        message: 'success',
                        user: fetch
                    });
                });
            });
        } else {
            if (passwordHash.verify(req.body.old, fetch.password)) {
                User.updateOne({
                    _id: req.body.id
                }, {
                    $set: {
                        password: passwordHash.generate(req.body.pass),
                    }
                }).then(r => {
                    User.findOne({
                        _id: req.body.id
                    }).then(fetch => {
                        shop.findOne({
                            user: req.body.id
                        }).populate("category").then(shop => {
                            res.json({
                                message: 'success',
                                user: fetch,
                                shop: shop
                            });
                        });
                    });
                });
            } else {
                res.json({
                    message: 'failed',
                });
            }
        }
    });
});



/* updateProfile */
router.post('/updateProfile', function (req, res, next) {
    User.updateOne({
        _id: req.body.id
    }, {
        $set: {
            username: req.body.username,
            phone: req.body.phone,
            countryCode: req.body.countryCode,
            address: req.body.location,
            lat: req.body.latitude,
            lng: req.body.longitude,
            role: 'User'
        }
    }).then(r => {
        User.findOne({
            _id: req.body.id
        }).then(fetch => {
            shop.findOne({
                user: req.body.id
            }).populate("category").then(shop => {
                res.json({
                    message: 'success',
                    user: fetch,
                    shop: shop
                });
            });

        });
    });
});
router.post('/updateProfileImages', function (req, res, next) {
    User.updateOne({
        _id: req.body.id
    }, {
        $set: {
            image: req.body.image,
        }
    }).then(r => {
        User.findOne({
            _id: req.body.id
        }).then(fetch => {
            res.json({
                message: 'success',
                user: fetch
            });
        });
    });
});


/* Shop  Category ========= Start */
router.get('/category/all', async function (req, res, next) {
    var cat = await category.find()
    res.json({
        message: 'success',
        data: cat
    });
});
router.post('/subcategory/bycat', async function (req, res, next) {
    var cat = await subcategory.find({
        category: req.body.catId
    })
    res.json({
        message: 'success',
        data: cat
    });
});



/* Seller  Shop ========= Start */

router.post('/shop/create', async function (req, res, next) {
    var fetch = await setting.find();
    var credits = fetch[0]['freeCreditOnShopCreate'];
    shop.create({
        name: req.body.shopname,
        address: req.body.location,
        country: '',
        city: '',
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        opentime: req.body.opentime,
        closetime: req.body.closetime,
        qrKey: '',
        phone: req.body.phone,
        phoneCode: req.body.phoneCode,
        views: 0,
        scanned: 0,
        adminFeature: 0,
        shopFeature: 0,
        credits: credits,
        image: req.body.image,
        category: req.body.catId,
        user: req.body.userId
    }).then(fetch => {
        shop.findOne({
            user: req.body.userId
        }).populate("category").then(shop => {
            res.json({
                message: 'success',
                shop: shop
            });
        });
    });
});

router.post('/shop/update', async function (req, res, next) {
    shop.updateOne({
        _id: req.body.id
    }, {
        $set: {
            name: req.body.shopname,
            address: req.body.location,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            opentime: req.body.opentime,
            closetime: req.body.closetime,
            phone: req.body.phone,
            phoneCode: req.body.phoneCode,
            image: req.body.image,
            category: req.body.catId,
            user: req.body.userId
        }
    }).then(fetch => {
        shop.findOne({
            user: req.body.userId
        }).populate("category").then(shop => {
            res.json({
                message: 'success',
                shop: shop
            });
        });
    });
});

/* Seller  Shop ========= End */



/* App  Product ========= Start */

router.post('/variable/bysubcat', async function (req, res, next) {
    var color = await variable.find({
        type: 'color',
        subcategory: req.body.subcatId
    }).populate("category subcategory")
    var size = await variable.find({
        type: 'size',
        subcategory: req.body.subcatId
    }).populate("category subcategory")
    res.json({
        message: 'success',
        color: color,
        size: size
    });
});



router.post('/product/all', function (req, res, next) {
    product.find({
        shop: req.body.shopId,
        subcategory: req.body.subCatId
    }).populate("shop subcategory category variable").then(product => {
        res.json({
            message: 'success',
            data: product
        });
    });

});


router.post('/product/create', function (req, res, next) {
    product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        brand: req.body.brand,
        images: req.body.image,
        views: 0,
        adminFeature: 0,
        shopFeature: 0,
        shares: 0,
        totalFav: 0,
        status: true,
        category: req.body.catId,
        subcategory: req.body.subcatId,
        shop: req.body.shopId
    }).then(r => {
        setting.find().then(fetch => {
            var credits = fetch[0]['creditDeductionOnAddProduct'];
            var newCr = req.body.oldCredits - credits;
            shop.updateOne({
                _id: req.body.shopId
            }, {
                $set: {
                    credits: newCr,
                }
            }).then(r => {
                shop.findOne({
                    _id: req.body.shopId
                }).populate("category").then(shopData => {
                    res.json({
                        message: 'success',
                        shop: shopData,
                    });
                });
            });
        });
    });
});

router.post('/product/update', async function (req, res, next) {
    product.updateOne({
        _id: req.body.id
    }, {
        $set: {
            name: req.body.name,
            price: req.body.price,
            images: req.body.image,
            description: req.body.description,
            brand: req.body.brand,
            category: req.body.catId,
            subcategory: req.body.subcatId,
            shop: req.body.shopId,
        }
    }).then(r => {
        setting.find().then(fetch => {
            var credits = fetch[0]['creditDeductionOnAddProduct'] / 2;
            var newCr = req.body.oldCredits - credits;
            shop.updateOne({
                _id: req.body.shopId
            }, {
                $set: {
                    credits: newCr,
                }
            }).then(r => {
                shop.findOne({
                    _id: req.body.shopId
                }).populate("category").then(shopData => {
                    res.json({
                        message: 'success',
                        shop: shopData,
                    });
                });
            });
        });
    });
});

router.post('/product/status', async function (req, res, next) {
    product.updateOne({
        _id: req.body.id
    }, {
        $set: {
            status: req.body.status,
        }
    }).then(r => {
        res.json({
            message: 'success',
        });
    });
});
router.post('/product/feature', async function (req, res, next) {
    await product.updateOne({
        _id: req.body.id
    }, {
        $set: {
            shopFeature: req.body.shopFeature,
        }
    });
    var fetch = await setting.find();
    var credits = fetch[0]['creditDeductionOnPromoteProduct'];
    var newCr = req.body.oldCredits - credits;
    console.log(newCr);
    shop.updateOne({
        _id: req.body.shopId
    }, {
        $set: {
            credits: newCr,
        }
    }).then(fetch => {
        shop.findOne({
            _id: req.body.shopId
        }).populate("category").then(shopData => {
            res.json({
                message: 'success',
                shop: shopData,
            });
        });
    });
});

router.get('/product/delete/:id', async function (req, res, next) {
    await product.deleteOne({
        _id: req.params.id
    })
    res.json({
        message: 'Successfully deleted',
    });
});



/* App  Product ========= End */


/* App  FeedBack ========= Start */

router.get('/feedback', async function (req, res, next) {
    product.create({
        topic: req.body.topic,
        message: req.body.message,
        status: 'unread',
        user: req.body.userId
    }).then(r => {
        res.json({
            message: 'success',
        });
    });
});

/* App  Contact Us ========= Start */
router.post('/contactUs', async function (req, res, next) {
    contactUs.create({
        topic: req.body.topic,
        message: req.body.message,
        status: 'unread',
        user: req.body.userId
    }).then(r => {
        res.json({
            message: 'success',
        });
    });
});
/* App  Packages ========= Start */
router.get('/getAllPackages', async function (req, res, next) {
    var fetch = await package.find({
        status: "Active"
    });
    res.json({
        message: 'success',
        data: fetch
    });
});
router.post('/assignCredits', async function (req, res, next) {
    shop.updateOne({
        _id: req.body.shopId
    }, {
        $set: {
            credits: req.body.credits,
        }
    }).then(r => {
        shop.findOne({
            _id: req.body.shopId
        }).populate("category").then(shop => {
            res.json({
                message: 'success',
                shop: shop
            })
        });
    });
});

router.post('/sellerHomeData', async function (req, res, next) {
    product.find({
        shop: req.body.shopId
    }).limit(3).populate("shop subcategory category").then(product => {
        res.json({
            message: 'success',
            hotProducts: product
        });
    });
});

router.post('/customer/home', async function (req, res, next) {
    shop.find({
        $or: [{
            adminFeature: 1,
            shopFeature: 1
        }]
    }).limit(10).populate("category").then(shops => {
        product.find({
            $or: [{
                adminFeature: 1,
                status: true
            }]
        }).limit(10).then(products => {
            product.find({
                status: true
            }).sort({
                views: -1,
            }).limit(10).then(hotproduct => {
                res.json({
                    message: 'success',
                    FeaturedShop: shops,
                    FeaturedProdcut: products,
                    HotProdcut: hotproduct,
                });
            });
        });
    });
});

router.post('/scannedfeaturedpro', async function (req, res, next) {
    let temp = [];
    scannedshop.find({
        user: req.body.userId
    }).then(shops => {
        console.log(shops.length)
        shops.forEach(async (element, i) => {
            await product.find({
                shop: element.shop,
                shopFeature: 1,
                status: true
            }).limit(2).then(async featureproducts => {
                console.log(featureproducts.length)
                if (featureproducts.length != 0) {
                    await featureproducts.forEach((element2, j) => {
                        console.log(element2.status)
                        temp.push(element2);
                        if (i == shops.length - 1 && featureproducts.length - 1 == j) {
                            res.json({
                                message: 'success',
                                scannedshopproducts: temp
                            });
                        }
                    });
                }
                if (i == shops.length - 1, featureproducts.length == 0) {
                    res.json({
                        message: 'success',
                        scannedshopproducts: temp
                    });
                }
            });
        });
        console.log(shops)
    });
});

router.post('/userscannedshop', async function (req, res, next) {
    var indexx = 0;
    var shopsArry = []
    scannedshop.find({
        user: req.body.userId
    }).populate({
        path: "shop",
        populate: {
            path: "category"
        }
    }).then(scanshops => {
        console.log(scanshops.length)
        scanshops.forEach(async (element, i) => {
            var temprating = 0;
            var finalrating = 0;
            console.log(element.shop._id)
            var countproducts = await product.find({
                shop: element.shop._id
            });
            var countreviews = await review.find({
                shop: element.shop._id
            });
            console.log(countproducts.length);
            console.log(countreviews.length);
            if (countreviews.length != 0) {
                await countreviews.forEach((elementss, a) => {
                    temprating = temprating + elementss.stars
                    console.log('------', temprating)
                    if (a == countreviews.length - 1) {
                        console.log('---------', finalrating)
                        finalrating = temprating / countreviews.length
                        console.log('---------', finalrating)
                    }
                });
            }
            indexx++;
            shopsArry.push({
                "shop": element,
                "productlength": countproducts.length,
                "ratings": finalrating
            })
            if (scanshops.length == indexx) {
                res.json({
                    message: 'success',
                    myshops: shopsArry,
                });
            }
        });
    });
});

router.post('/shop/home', async function (req, res, next) {
    var cats = []
    var finalarry = []
    var temprating = 0;
    var finalrating = 0;
    var tempindex = 0;
    var shopdetail = await shop.findOne({
        _id: req.body.shopId
    }).populate("user");
    var updateview = await shop.updateOne({
        _id: req.body.shopId
    }, {
        $set: {
            views: parseInt(shopdetail.views) + 1,
        }
    });
    var countproducts = await product.find({
        shop: req.body.shopId
    });
    var countreviews = await review.find({
        shop: req.body.shopId
    });
    if (countreviews.length != 0) {
        await countreviews.forEach((elementss, a) => {
            temprating = temprating + elementss.stars
            console.log('------', temprating)
            if (a == countreviews.length - 1) {
                console.log('---------', finalrating)
                finalrating = temprating / countreviews.length
                console.log('---------', finalrating)
            }
        });
    }
    console.log(countproducts.length);
    console.log(countreviews.length);
    await subcategory.find({
        category: req.body.catId
    }).then(subcatlist => {
        console.log(subcatlist.length)
        tempindex = 0;
        subcatlist.forEach(async (element, i) => {
            await product.find({
                subcategory: element._id,
                shop: req.body.shopId,
                status: true
            }).limit(8).then(products => {
                console.log(products.length)
                if (products.length !== 0) {
                    // cats = [];
                    // cats.push({"subcategory":element,"products":products})
                    // tempro = products;
                    finalarry.push({
                        "subcategory": element,
                        "products": products
                    })
                    if (subcatlist.length - 1 == tempindex) {
                        res.json({
                            message: 'success',
                            subcats: finalarry,
                            productlength: countproducts.length,
                            reviewslength: countreviews.length,
                            ratings: finalrating
                        });
                    }
                    tempindex++;
                } else if (subcatlist.length - 1 == tempindex && products.length == 0) {
                    res.json({
                        message: 'success',
                        subcats: finalarry,
                        productlength: countproducts.length,
                        reviewslength: countreviews.length,
                        ratings: finalrating
                    });
                    tempindex++;
                } else {
                    tempindex++;
                }
            });
        });
    });
});

router.post('/shop/homeall', async function (req, res, next) {
    var cats = []
    var finalarry = []
    var temprating = 0;
    var finalrating = 0;
    var tempindex = 0;
    try {
        var catId = await shop.findOne({
            _id: req.body.shopId
        }).populate("user").populate("category");
        var updateview = await shop.updateOne({
            _id: catId._id
        }, {
            $set: {
                views: parseInt(catId.views) + 1,
            }
        });
        var countproducts = await product.find({
            shop: req.body.shopId
        });
        var countreviews = await review.find({
            shop: req.body.shopId
        });
        if (countreviews.length != 0) {
            await countreviews.forEach((elementss, a) => {
                temprating = temprating + elementss.stars
                console.log('------', temprating)
                if (a == countreviews.length - 1) {
                    console.log('---------', finalrating)
                    finalrating = temprating / countreviews.length
                    console.log('---------', finalrating)
                }
            });
        }
        console.log(countproducts.length);
        console.log(countreviews.length);
        console.log(catId, 'catid');
        await subcategory.find({
            category: catId.category
        }).then(subcatlist => {
            console.log(subcatlist.length)
            tempindex = 0;
            subcatlist.forEach(async (element, i) => {
                await product.find({
                    subcategory: element._id,
                    shop: req.body.shopId,
                    status: true
                }).then(products => {
                    console.log(products.length)
                    if (products.length !== 0) {
                        // cats = [];
                        // cats.push({"subcategory":element,"products":products})
                        // tempro = products;
                        finalarry.push({
                            "subcategory": element,
                            "products": products
                        })
                        if (subcatlist.length - 1 == tempindex) {
                            res.json({
                                message: 'success',
                                // subcats: finalarry,
                                productlength: countproducts.length,
                                reviewslength: countreviews.length,
                                ratings: finalrating,
                                allsubcategories: subcatlist,
                                shop: catId,
                                allproducts: countproducts.reverse()
                            });
                        }
                        tempindex++;
                    } else if (subcatlist.length - 1 == tempindex && products.length == 0) {
                        res.json({
                            message: 'success',
                            // subcats: finalarry,
                            productlength: countproducts.length,
                            reviewslength: countreviews.length,
                            ratings: finalrating,
                            shop: catId,
                            allsubcategories: subcatlist,
                            allproducts: countproducts.reverse()
                        });
                        tempindex++;
                    } else {
                        tempindex++;
                    }
                });
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error occured",
            error,
        });
    }
});

router.post('/addscanshop', async function (req, res, next) {
    //notification pending.......


    ///////////////////////////
    var getshop = await shop.findOne({
        _id: req.body.shopId
    })
    var creditsnum = await setting.findOne();
    console.log(creditsnum.creditAdditionOnQrScan);
    scannedshop.find({
        user: req.body.userId,
        shop: req.body.shopId,
    }).then(async shops => {
        var addcradits = await shop.updateOne({
            _id: req.body.shopId
        }, {
            $set: {
                credits: getshop.credits + parseInt(creditsnum.creditAdditionOnQrScan),
                scanned: parseInt(getshop.scanned) + 1
            }
        })
        console.log(shops)
        if (shops.length != 0) {
            console.log(shops);
            res.json({
                message: 'already',
            });
        } else {
            scannedshop.create({
                user: req.body.userId,
                shop: req.body.shopId,
            }).then(product => {
                res.json({
                    message: 'success',
                    Products: product
                });
            });
        }
    })

});

router.post('/scanchecker', async function (req, res, next) {
    scannedshop.findOne({
        shop: req.body.shopId,
        user: req.body.userId
    }).then(scanned => {
        if (scanned) {
            res.json({
                message: true,

            });
        } else {
            res.json({
                message: false,


            });
        }
    });
});

router.post('/subcategory/product', async function (req, res, next) {
    product.find({
        shop: req.body.shopId,
        subcategory: req.body.subcategoryId
    }).then(subproducts => {
        res.json({
            message: 'success',
            products: subproducts
        });
    });
});

router.post('/updatelocation', async function (req, res, next) {

    user.updateOne({
        _id: req.body.id
    }, {
        $set: {
            lng: req.body.lng,
            lat: req.body.lat
        }
    }).then(details => {
        res.json({
            message: 'success',
        });
    });
});

router.post('/product/webdetail', async function (req, res, next) {
    try {
        var details = await product.findOne({
            _id: req.body.id,
        });
        if (details != null) {
            var recommends = await product.find({
                subcategory: details.subcategory,
                _id: {
                    $ne: req.body.id
                }
            }).limit(10);
            console.log(recommends);
        }
        res.json({
            message: 'success',
            productdetail: details,
            recommend: recommends
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error occured",
            error,
        });
    }
});

router.post('/allstats', async function (req, res, next) {
    try {
        var products = await product.find({}, {
            "_id": 0
        });
        var shops = await shop.find({}, {
            "_id": 0
        });
        var users = await user.find({}, {
            "_id": 0
        });
        console.log(products);
        console.log(shops);
        console.log(users);
        res.json({
            message: 'success',
            productslength: products.length,
            shopslength: shops.length,
            userslength: users.length
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error occured",
            error,
        });
    }
});

router.post('/nearbyshops', async function (req, res, next) {
    try {
        shop.find({}, {
            "name": 1,
            "latitude": 1,
            "longitude": 1,
        }).populate("category", {
            "name": 1
        }).then(address => {
            res.json({
                message: 'success',
                shopaddress: address
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error occured",
            error,
        });
    }
});

router.post('/shop/scan', async function (req, res, next) {
    var temprating = 0;
    var finalrating = 0;
    var tempindex = 0;

    var shopdetail = await shop.findOne({
        _id: req.body.shopId
    }).populate("category");
    var countproducts = await product.find({
        shop: req.body.shopId
    });
    var countreviews = await review.find({
        shop: req.body.shopId
    });
    if (countreviews.length != 0) {
        await countreviews.forEach((elementss, a) => {
            temprating = temprating + elementss.stars
            console.log('------', temprating)
            if (a == countreviews.length - 1) {
                console.log('---------', finalrating)
                finalrating = temprating / countreviews.length
                console.log('---------', finalrating)
            }
        });
    }
    res.json({
        message: 'success',
        productlength: countproducts.length,
        shopdetails: shopdetail,
        ratings: finalrating
    });
    console.log(countproducts.length);
    console.log(countreviews.length);
});

router.post('/addreview', async function (req, res, next) {
    // notification pending
    review.create({
        shop: req.body.shopId,
        user: req.body.userId,
        message: req.body.message,
        stars: req.body.stars
    }).then(newreview => {
        res.json({
            message: 'success',
            reviewadded: newreview
        });
    });
});

router.post('/product/details', async function (req, res, next) {
    var temprating = 0;
    var finalrating = 0;
    var userreview = false;
    var userreviewdetail;
    var star5 = await review.find({
        $or: [{
            stars: 4.5
        }, {
            stars: 5
        }],
        shop: req.body.shopId
    });
    var star4 = await review.find({
        $or: [{
            stars: 3.5
        }, {
            stars: 4
        }],
        shop: req.body.shopId
    });
    var star3 = await review.find({
        $or: [{
            stars: 2.5
        }, {
            stars: 3
        }],
        shop: req.body.shopId
    });
    var star2 = await review.find({
        $or: [{
            stars: 1.5
        }, {
            stars: 2
        }],
        shop: req.body.shopId
    });
    var star1 = await review.find({
        $or: [{
            stars: 0.5
        }, {
            stars: 1
        }],
        shop: req.body.shopId
    });
    var star0 = await review.find({
        stars: 0,
        shop: req.body.shopId
    });

    var reviewslist = await review.find({
        shop: req.body.shopId,
    }).populate("user").limit(15).sort({
        _id: -1
    });
    product.findOne({
        _id: req.body.productId,
    }).then(async prodetail => {
        console.log(reviewslist.length);
        if (reviewslist.length != 0) {
            await reviewslist.forEach((elementss, a) => {
                temprating = temprating + elementss.stars
                console.log('------', temprating)
                if (a == reviewslist.length - 1) {
                    console.log('---------', finalrating)
                    finalrating = temprating / reviewslist.length
                    console.log('---------', finalrating)
                }
            });
        }
        await review.findOne({
            user: req.body.userId,
            shop: req.body.shopId
        }).then(async reviewdetail => {
            if (reviewdetail) {
                userreview = true;
                userreviewdetail = reviewdetail
            } else {
                userreview = false;
                userreviewdetail = reviewdetail
            }
        })
        var updateview = await product.updateOne({
            _id: req.body.productId
        }, {
            $set: {
                views: prodetail.views + 1,
            }
        });
        console.log('upppppdate', updateview)
        res.json({
            message: 'success',
            starstats: {
                "star5": star5.length,
                "star4": star4.length,
                "star3": star3.length,
                "star2": star2.length,
                "star1": star1.length,
                "star0": star0.length
            },
            views: prodetail.views,
            userreview: userreview,
            userreviewdetail: userreviewdetail,
            ratings: finalrating,
            reviews: reviewslist,

        });
    });
});

router.post('/uploadImage', function (req, res, next) {
    var realFile = Buffer.from(req.body.image, "base64");
    fs.writeFile("./uploads/" + req.body.name, realFile, function (err) {
        if (err)
            res.json(err);
        else
            res.json(req.body.name);
    });
});




// single uploadImage
router.post('/uploadImage1', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            res.json({
                error_code: 1,
                err_desc: err
            });
            return;
        }
        let filename = req.file.filename;
        res.json(filename);
    });
});
// multi uploadImage
router.post('/multiplefiles', function (req, res, next) {
    uploadd(req, res, function (err) {
        if (err) {
            res.json({
                error_code: 1,
                err_desc: err
            });
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
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
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