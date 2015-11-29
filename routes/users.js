var express = require('express');
var User = require('../models/user');
var connectEnsureLogin = require("connect-ensure-login");
var router = express.Router();

module.exports = function(passport){

	// [GET] All Users
	router.get('/users', connectEnsureLogin.ensureLoggedIn(), function(req, res) {
	  User.find(function(err, User){
	    console.log(User);
	    res.render('back/users', {title : 'Users', User : User});
	  });
	});

	// [GET] Login Page
	router.get('/login', function(req, res){
		res.render('back/login',{title : 'Login', message: req.flash('message')});
	});

	// [POST] Handle Login
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/app/home',
		failureRedirect: '/app/login',
		failureFlash : true
	}));

	// [GET] Registration Page
	router.get('/signup', function(req, res){
		res.render('back/register',{title : 'Sign Up', message: req.flash('message')});
	});

	// [POST] Handle Registration
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/app/users',
		failureRedirect: '/app/signup',
		failureFlash : true
	}));

	// [GET] Handle Logout
	router.get('/signout', function(req, res) {
	  req.logout();
	  req.session.destroy();
	  res.send("logged out", 200);
		// res.redirect(200, '/');
	});

	return router;
};
