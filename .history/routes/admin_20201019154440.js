var express = require('express');
var router = express.Router();
const User = require('../models/user')
const Report = require('../models/report')
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var config = require('../config');


/* LOGIN. */
router.post('/home', function(req, res, next) {
    res.json({ message: 'email' });

});




module.exports = router;