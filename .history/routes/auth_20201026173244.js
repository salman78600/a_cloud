var express = require('express');
var router = express.Router();
const User = require('../models/user')
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var config = require('../config');



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
        lastLogin: '',
        lastIp: req.body['lastIp'],
        showNotif: true,
        role: 'user',
    }).then((resp) => {
        var token = jwt.sign({ check: true }, 'login_auth', {
            expiresIn: '100d'
        });
        res.json({
            message: 'success',
            token: token,
            user: resp
        })
    });
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
                res.json({
                    message: 'success',
                    token: token,
                    user: fetch,
                });
            } else {
                res.send('ok');
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
                    lastLogin: '',
                    lastIp: req.body['lastIp'],
                    showNotif: true,
                    role: 'user',
                }).then((resp) => {
                    var token = jwt.sign({ check: true }, 'login_auth', {
                        expiresIn: '100d'
                    });
                    res.json({
                        message: 'success',
                        token: token,
                        user: resp
                    })
                });
            }
        });
});











/* ADMIN LOGIN */
router.post('/adminLogin', function(req, res, next) {
    var email = req.body['email'];
    var password = req.body['password'];
    User.findOne({ email: email }).then(
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