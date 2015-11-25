var express = require('express');
var User = require('../models/user');
var connectEnsureLogin = require("connect-ensure-login");
var router = express.Router();

// var isAuthenticated = function (req, res, next) {
// 	if (req.isAuthenticated())
// 		return next();
// 	res.redirect('/');
// };

module.exports = function(passport){
	/* [GET] login page. */
	router.get('/', function(req, res) {
		res.render('index', {title : 'Index', message: req.flash('message') });
	});

	/* [GET] Login Page */
	router.get('/login', function(req, res){
		res.render('login',{title : 'Login', message: req.flash('message')});
	});
	/* [POST] Handle Login */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/login',
		failureFlash : true
	}));

	/* [GET] Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{title : 'Sign Up', message: req.flash('message')});
	});
	/* [POST] Handle Registration */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	/* [GET] Home Page */
	router.get('/home', connectEnsureLogin.ensureLoggedIn(), function(req, res){
		res.render('home', {title : 'Home', user: req.user });
	});

	/* [GET] Handle Logout */
	router.get('/signout', function(req, res) {
	  req.logout();
	  req.session.destroy();
	  res.send("logged out", 200);
	});

	return router;
};
