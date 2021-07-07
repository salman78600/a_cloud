var express = require('express');
var router = express.Router();
const User = require('../models/user')
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');


/* LOGIN. */
router.post('/login', function(req, res, next) {
    var email = req.body['email'];
    var password = req.body['password'];
    User.findOne({ email: email }).then(
        fetch => {
            res.json(fetch);
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


/* REGISTER. */
router.post('/register', function(req, res, next) {
    var data = req.body;
    User.findOne({ email: data['email'] }).then(en => {
        if (en !== null) {
            res.json({ message: 'email' });
        } else {
            User.create({
                username: data['username'],
                phone: data['phone'],
                countryCode: data['countryCode'],
                password: passwordHash.generate(data['password']),
                email: data['email'],
            }).then((resp) => {
                var token = jwt.sign({ check: true }, 'login_auth', {
                    expiresIn: '100d'
                });
                res.json({
                    message: 'success',
                    token: token,
                    user: resp
                })
            })
        }
    });
});

module.exports = router;