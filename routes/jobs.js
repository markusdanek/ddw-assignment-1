var express = require('express');
var Job = require('../models/job');
var MongoDB = require('mongojs');
var connectEnsureLogin = require("connect-ensure-login");
var router = express.Router();

module.exports = function(){

  // [GET] List jobs
  router.get('/jobs', connectEnsureLogin.ensureLoggedIn(),  function (req, res) {
    Job.find(function (err, jobs) {
      if (err) return res.send(500, { error: err });
      else res.render('back/jobs', {title : 'Users', Jobs : jobs});
    });
  });

  // [GET] Create new job form
  router.get('/jobs/new', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
    res.render('back/job-single', {create: true});
  });

  // [POST] Insert new job
  router.post('/jobs/', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
    var newJob = new Job( {name: req.body.name, email: req.body.email, number: req.body.number} );
    newJob.save( function (err, data) {
      if (err) return res.send(500, { error: err });
      else { res.redirect('/app/jobs/'); }
    });
  });

  // [GET] Delete job
  router.get('/jobs/:id/delete', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
    var id = req.params.id;
    // console.log(id);
    Job.remove({_id: MongoDB.ObjectId(id)}, function (err, doc) {
      if (err) return res.send(500, { error: err });
      else { res.redirect('/app/jobs/'); }
    });
  });

  // [GET] List single job
  router.get('/jobs/:id', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
    var id = req.params.id;
    Job.findOne({_id: MongoDB.ObjectId(id)}, function (err, jobs) {
      if (err) return res.send(500, { error: err });
      else res.render('back/job-single', {title : 'Users', job : jobs, edit: true});
    });
  });

  // [POST] Edit single job
  router.post('/jobs/:id', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
    var id = req.params.id;
    Job.findOneAndUpdate(
      {_id: MongoDB.ObjectId(id)},
      {name: req.body.name, email: req.body.email, number: req.body.number},
      {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.redirect('/app/jobs/'+id);
    });
  });

	return router;
};
