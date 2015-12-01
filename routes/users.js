var express = require('express');
var User = require('../models/user');
var MongoDB = require('mongojs');
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

	// [GET] List single user
  router.get('/users/:id', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
    var id = req.params.id;
    User.findOne({_id: MongoDB.ObjectId(id)}, function (err, User) {
      if (err) return res.send(500, { error: err });
      else res.render('back/user-single', {title : 'Users Single', user : User, edit: true});
    });
  });

	// [POST] Edit single user
  router.post('/users/:id', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
    var id = req.params.id;
    User.findOneAndUpdate(
      {_id: MongoDB.ObjectId(id)},
      {name: req.body.username, email: req.body.email, password: req.body.password, firstName: req.body.firstName, lastName: req.body.lastName},
      {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.redirect('/app/users/'+id);
    });
  });

	// [GET] Delete user
  router.get('/users/:id/delete', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
    var id = req.params.id;
    User.remove({_id: MongoDB.ObjectId(id)}, function (err, doc) {
      if (err) return res.send(500, { error: err });
      else { res.redirect('/app/users/'); }
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
