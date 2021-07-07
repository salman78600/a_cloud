var express = require('express');
var router = express.Router();
const User = require('../models/user')
const Report = require('../models/report')
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var config = require('../config');


/* LOGIN. */
router.post('/home', async function(req, res, next) {
    var re = await Report.find();
    res.json(re);

});




module.exports = router;