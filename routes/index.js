var express = require('express');
var User = require('../models/user');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
};

module.exports = function(passport){
	/* GET login page. */
	router.get('/', function(req, res) {
    // Display the Index page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* GET Login Page */
	router.get('/login', function(req, res){
		res.render('login',{message: req.flash('message')});
	});
	/* POST Handle Login */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/login',
		failureFlash : true
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});
	/* POST Handle Registration */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	router.get('/users', isAuthenticated, function(req, res) {
	  User.find(function(err, User){
	    console.log(User);
	    res.render('users',{title : 'User', User : User});
	  });
	});

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});
	/* GET Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
};
