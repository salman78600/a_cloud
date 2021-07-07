var express = require('express');
var router = express.Router();
const User = require('../models/user')
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var config = require('../config');
const shop = require('../models/shop');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});



/* asPhoneLogin */
router.post('/asPhoneLogin', function(req, res, next) {
    User.findOne({ countryCode: req.body['countryCode'], phone: req.body['phone'] }).then(
        fetch => {
            if (fetch != null) {
                req.session.user = fetch;
                const payload = {
                    check: true
                };
                var token = jwt.sign(payload, config.secret, {
                    expiresIn: '100d'
                });
                shop.findOne({ user: fetch._id }).then(shop => {
                    res.json({
                        message: 'success',
                        token: token,
                        user: fetch,
                        shop: shop
                    })
                });
            } else {
                User.create({
                    username: 'Guest_' + Date.now(),
                    phone: req.body['phone'],
                    countryCode: req.body['countryCode'],
                    password: '',
                    email: '',
                    fingerprint: '',
                    image: 'avatar.png',
                    status: 1,
                    active: true,
                    lastLogin: Date.now(),
                    address: '',
                    lat: '',
                    lng: '',
                    showNotif: true,
                    role: 'User',
                    $push: {
                        fcmTokens: { fcmToken: req.body.token, deviceType: req.body.deviceType },
                    },
                }).then((resp) => {
                    req.session.user = resp;
                    const payload = {
                        check: true
                    };
                    var token = jwt.sign(payload, config.secret, {
                        expiresIn: '100d'
                    });
                    shop.findOne({ user: resp._id }).then(shop => {
                        res.json({
                            message: 'success',
                            token: token,
                            user: resp,
                            shop: shop
                        })
                    });
                });
            }
        });
});



/* asGuestLogin. */
router.post('/asGuestLogin', function(req, res, next) {
    User.create({
        username: 'Guest_' + Date.now(),
        phone: '',
        countryCode: '',
        password: '',
        email: '',
        fingerprint: '',
        image: 'avatar.png',
        status: 1,
        active: true,
        lastLogin: Date.now(),
        address: '',
        lat: '',
        lng: '',
        showNotif: true,
        role: 'Guest',
        $push: {
            fcmTokens: { fcmToken: req.body.token, deviceType: req.body.deviceType },
        },
    }).then((resp) => {
        req.session.user = resp;
        const payload = {
            check: true
        };
        var token = jwt.sign(payload, config.secret, {
            expiresIn: '100d'
        });
        shop.findOne({ user: resp._id }).then(shop => {
            res.json({
                message: 'success',
                token: token,
                user: resp,
                shop: shop
            })
        });
    });
});

/* asFingerprintLogin. */
router.post('/asFingerprintLogin', function(req, res, next) {
    User.create({
        username: 'Guest_' + Date.now(),
        phone: '',
        countryCode: '',
        password: '',
        email: '',
        fingerprint: '',
        image: 'avatar.png',
        status: 1,
        active: true,
        lastLogin: Date.now(),
        address: '',
        lat: '',
        lng: '',
        showNotif: true,
        role: 'Guest',
        $push: {
            fcmTokens: { fcmToken: req.body.token, deviceType: req.body.deviceType },
        },
    }).then((resp) => {
        req.session.user = resp;
        const payload = {
            check: true
        };
        var token = jwt.sign(payload, config.secret, {
            expiresIn: '100d'
        });
        shop.findOne({ user: resp._id }).then(shop => {
            res.json({
                message: 'success',
                token: token,
                user: resp,
                shop: shop
            })
        });
    });
});











/* ADMIN LOGIN */
router.post('/adminLogin', function(req, res, next) {
    var email = req.body['email'];
    var password = req.body['password'];
    User.findOne({ email: email, role: 'Admin' }).then(
        fetch => {
            if (fetch != null) {
                if (passwordHash.verify(password, fetch.password)) {
                    req.session.user = fetch;
                    const payload = {
                        check: true
                    };
                    var token = jwt.sign(payload, config.secret, {
                        expiresIn: '100d'
                    });
                    res.json({
                        message: 'authentication done',
                        token: token,
                        user: fetch,
                    });
                } else {
                    res.json(null);
                }
            } else {
                res.json(null);
            }
        });
});

module.exports = router;