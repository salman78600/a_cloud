var express = require('express');
var router = express.Router();
const User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/test', function(req, res, next) {
    User.find().then((e) => {
        console.log(e);
        res.send('dsfdfsd');
    });
});
module.exports = router;