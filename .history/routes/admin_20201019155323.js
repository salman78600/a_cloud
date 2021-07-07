var express = require('express');
var router = express.Router();
const User = require('../models/user')
const Report = require('../models/report')
const Shop = require('../models/shop')
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var config = require('../config');


/* LOGIN. */
router.post('/home', async function(req, res, next) {
    var report = await Report.find();
    var shop = await Shop.find();
    var user = await Report.find();
    res.json(re);

});




module.exports = router;