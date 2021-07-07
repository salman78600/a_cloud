var express = require('express');
var router = express.Router();
const User = require('../models/user')
var jwt = require('jsonwebtoken');

/* LOGIN. */
router.post('/login', function(req, res, next) {
    res.json(null);

    var email = req.body['email'];
    var password = req.body['password'];
    User.findOne({ where: { email: email } }).then(
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


/* REGISTER. */
router.post('/register', function(req, res, next) {
    var data = req.body;
    User.findOne({ where: { email: data['email'] } }).then(en => {
        if (en !== null) {
            res.json({ message: 'email' });
        } else {
            User.create({
                username: "abuzar1047",
                phone: "3126629694",
                countryCode: "+92",
                password: "123456",
                email: "abuzar2407@hotmail.com",
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



    // res.json(username);

});











router.get('/register', function(req, res, next) {
    User.create({
        username: "abuzar1047",
        phone: "3126629694",
        countryCode: "+92",
        password: "123456",
        email: "abuzar2407@hotmail.com",
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
});


module.exports = router;