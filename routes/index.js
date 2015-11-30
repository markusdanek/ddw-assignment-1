var express = require('express');
var User = require('../models/user');
var Job = require('../models/job');
var MongoDB = require('mongojs');
var connectEnsureLogin = require("connect-ensure-login");
var router = express.Router();

module.exports = function(passport){

	/* [GET] Index page. */
	router.get('/', function(req, res) {
		res.render('index', {title : 'Index', message: req.flash('message') });
	});

	/* [GET] App Page */
	router.get('/app', connectEnsureLogin.ensureLoggedIn(), function(req, res){
		res.render('back/home', {title : 'Home', user: req.user });
	});

	/* [GET] Home Page */
	router.get('/app/home', connectEnsureLogin.ensureLoggedIn(), function(req, res){
		res.render('back/home', {title : 'Home', user: req.user });
		// res.redirect('/app');
	});

	router.get('/jobs', function (req, res) {
    Job.find(function (err, jobs) {
      if (err) return res.send(500, { error: err });
      else res.render('jobs', {title : 'Jobs', Jobs : jobs});
    });
  });

	// [GET] List single job
  router.get('/jobs/:id', function (req, res) {
    var id = req.params.id;
    Job.findOne({_id: MongoDB.ObjectId(id)}, function (err, jobs) {
      if (err) return res.send(500, { error: err });
      else res.render('job-single', {title : 'Jobs Single', job : jobs, edit: false});
    });
  });

	return router;
};
