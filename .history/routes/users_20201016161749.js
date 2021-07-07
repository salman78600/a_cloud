var express = require('express');
var router = express.Router();
const User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/register', function(req, res, next) {
    User.create({
        username: "abuzar1047",
        phone: "3126629694",
        countryCode: "+92",
        password: "123456",
        email: "abuzar2407@hotmail.com",
    }).then((a) => {
        res.json({ message: 'done' })
    })
});


module.exports = router;