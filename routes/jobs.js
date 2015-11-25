var express = require('express');
var Job = require('../models/job');
var connectEnsureLogin = require("connect-ensure-login");
var router = express.Router();

module.exports = function(){

  // [GET] All Jobs
  router.get('/jobs', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
    Job.find(function (err, Job) {
      console.log(Job);
      res.render('jobs', {title : 'Jobs', Job : Job});
    });
  });

  // [POST] Insert Job
  router.post('/jobs', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
    console.log(req.body);
    Job.insert(req.body, function(err, Job) {
      res.render('jobs', {title : 'Jobs', Job : Job});
    });
  });

  // // [DELETE] Delte Job:ID
  // router.delete('/jobs/:id', function (req, res) {
  //   var id = req.params.id;
  //   console.log(id);
  //   Job.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
  //     res.json(doc);
  //   });
  // });
  //
  // // [GET] All Job:ID
  // router.get('/jobs/:id', function (req, res) {
  //   var id = req.params.id;
  //   console.log(id);
  //   Job.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
  //     res.json(doc);
  //   });
  // });
  //
  // // [GET] Update Job:ID
  // router.put('/jobs/:id', function (req, res) {
  //   var id = req.params.id;
  //   console.log(req.body.name);
  //   Job.findAndModify({
  //     query: {_id: mongojs.ObjectId(id)},
  //     update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
  //     new: true}, function (err, doc) {
  //       res.json(doc);
  //     }
  //   );
  // });

	return router;
};
