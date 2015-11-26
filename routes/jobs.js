var express = require('express');
var Job = require('../models/job');
var connectEnsureLogin = require("connect-ensure-login");
var router = express.Router();

module.exports = function(){

  router.get('/jobs', function (req, res) {
    console.log('I received a GET request');

    Job.find(function (err, docs) {
      console.log(docs);
      res.json(docs);
    });
  });

  router.post('/jobs', function (req, res) {
    console.log(req.body);
    Job.insert(req.body, function(err, doc) {
      res.json(doc);
    });
  });

  router.delete('/jobs/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    Job.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
      res.json(doc);
    });
  });

  router.get('/jobs/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    Job.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
      res.json(doc);
    });
  });

  router.put('/jobs/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    Job.findAndModify({
      query: {_id: mongojs.ObjectId(id)},
      update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
      new: true}, function (err, doc) {
        res.json(doc);
      }
    );
  });

	return router;
};
