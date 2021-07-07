var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var jwt = require('jsonwebtoken');
var config = require('./config');
var cors = require('cors')
var session = require('express-session');


// Database connection start
mongoose.connect('mongodb://root:abuzar.1047@206.189.22.185:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
// Database connection end

var app = express();
//cors
app.use(cors());
app.set('Secret', config.secret);
app.use(express.static(__dirname + '/uploads'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Header For Access
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Token, Access-Id");
    next();
});

// Token MiddleWares start
var checkTokken = function(req, res, next) {
    // check header for the token
    var token = req.headers['access-token'];
    console.log(req.headers['access-id']);
    // decode toke
    if (token) {
        jwt.verify(token, app.get('Secret'), (err, decoded) => {
            // return res.send(401); 
            if (err) {
                return res.send(401);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send(401);
    }
};
var verifyTokken = function(req, res) {
    var token = req.body.token;
    if (token) {
        jwt.verify(token, app.get('Secret'), (err, decoded) => {
            if (err) {
                return res.send(401);
            } else {
                return res.json({ message: 'valid' });
            }
        });
    } else {
        // if there is no token  
        res.send(401);

    }
};
var checkTokkenFilter = function(req, res, next) {
    if (req._parsedUrl.pathname === '/tokenverify') {
        verifyTokken(req, res);
    } else if (req._parsedUrl.pathname === '/account/login' || req._parsedUrl.pathname === '/material/create/image' || req._parsedUrl.pathname === '/account/register' || req._parsedUrl.pathname === '/settings/register/check') {
        next();
    } else {
        checkTokken(req, res, next);
    }
}
app.use(checkTokkenFilter);
app.use(session({ secret: 'Hasnain@Elahi' }));
// Token MiddleWares end







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;