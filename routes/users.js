var express = require('express');
var User = require('../models/user');
var connectEnsureLogin = require("connect-ensure-login");
var router = express.Router();

module.exports = function(){

	// [GET] All Users
	router.get('/users', connectEnsureLogin.ensureLoggedIn(), function(req, res) {
	  User.find(function(err, User){
	    console.log(User);
	    res.render('users', {title : 'Users', User : User});
	  });
	});

	return router;
};
