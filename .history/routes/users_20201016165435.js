var express = require('express');
var router = express.Router();
const User = require('../models/user')
var jwt = require('jsonwebtoken');

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