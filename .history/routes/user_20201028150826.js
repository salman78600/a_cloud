var express = require('express');
var router = express.Router();
const User = require('../models/user')
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var config = require('../config');


/* changePassword */
router.post('/changePassword', function(req, res, next) {
    User.findOne({ _id: req.body.id }).then(fetch => {
        res.send(fetch.password);
        if (fetch.password == '') {
            User.updateOne({ _id: req.body.id }, {
                $set: {
                    password: passwordHash.generate(req.body.pass),
                }
            }).then(r => {
                User.findOne({ _id: req.body.id }).then(fetch => {
                    res.json({
                        message: 'success',
                        user: fetch
                    });
                });
            });
        } else {
            if (passwordHash.verify(req.body.pass, fetch.password)) {
                User.updateOne({ _id: req.body.id }, {
                    $set: {
                        password: passwordHash.generate(req.body.pass),
                    }
                }).then(r => {
                    User.findOne({ _id: req.body.id }).then(fetch => {
                        res.json({
                            message: 'success',
                            user: fetch
                        });
                    });
                });
            } else {
                res.json({
                    message: 'failed',
                });
            }

        }
    });
});




module.exports = router;