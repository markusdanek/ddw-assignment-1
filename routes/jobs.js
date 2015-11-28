var express = require('express');
var Job = require('../models/job');
var MongoDB = require('mongojs');
var connectEnsureLogin = require("connect-ensure-login");
var router = express.Router();

module.exports = function(){


  // List jobs
  router.get('/jobs', connectEnsureLogin.ensureLoggedIn(),  function (req, res) {
    console.log('I received a GET request');

    Job.find(function (err, jobs) {
      console.log(jobs);
      res.render('jobs', {title : 'Users', Jobs : jobs});
    });
  });


  // Create new job form
  router.get('/jobs/new', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
    console.log('I received a GET request');

    res.render('job-single', {create: true});
  });


  // Insert new job
  router.post('/jobs/', connectEnsureLogin.ensureLoggedIn(), function (req, res) {

    var newJob = new Job( {name: req.body.name, email: req.body.email, number: req.body.number} );

    newJob.save( function (err, data) {
      if (err) { console.log(err); }
      else { res.redirect('/app/jobs/') }
    });
  });

  // Delete job
  router.get('/jobs/:id/delete', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
    var id = req.params.id;
    console.log(id);
    Job.remove({_id: MongoDB.ObjectId(id)}, function (err, doc) {
      res.redirect('/jobs/');
    });
  });

  // List single job
  router.get('/jobs/:id', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
    console.log('I received a GET request');
    var id = req.params.id;
    Job.findOne({_id: MongoDB.ObjectId(id)}, function (err, jobs) {
      console.log(jobs);
      res.render('job-single', {title : 'Users', job : jobs, edit: true});
    });
  });

  // Edit single job
  router.post('/jobs/:id', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
    var id = req.params.id;

    Job.findOneAndUpdate({_id: MongoDB.ObjectId(id)}, {name: req.body.name, email: req.body.email, number: req.body.number}, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.redirect('/app/jobs/'+id);
    });

  });

	return router;
};
