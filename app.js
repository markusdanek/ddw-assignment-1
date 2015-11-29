var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dbConfig = require('./models/db');
var mongoose = require('mongoose');

mongoose.connect(dbConfig.url);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({
  secret: 'mrksisql',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var flash = require('connect-flash');
app.use(flash());

var initPassport = require('./passport/init');
initPassport(passport);

app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});

var index = require('./routes/index')(passport);
var users = require('./routes/users')(passport);
var jobs = require('./routes/jobs')(passport);
app.use('/', index);
app.use('/app', users);
app.use('/app', jobs);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

module.exports = app;
console.log("No errors, yay! Server running on port 3000");
