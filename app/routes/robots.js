'use strict';
var express = require('express');
var router = express.Router();

var robotscontroller = require('../controllers/robotscontroller');

router.get('/api/robots', function(req, res) {
  //console.log("/routes/robots.js called");
  robotscontroller.list_all_robots(req, res);
  //res.json(robotscontroller.dummy);
  //robotscontroller.dummy(req,res);
  //res.json({message: "from routes/robot.js"});
});

router.post('/api/robots', function(req, res) {
  console.log("POSTED to /api/robots");

  robotscontroller.create_robot(req, res);
  //res.json({message: "post ok"});
});

router.delete('/api/robots', function(req, res) {
  console.log("DELETE called for ALL robots");
  robotscontroller.delete_all_robots(req, res);
});

router.delete('/api/robots/:name', function(req,res) {
  console.log("DELETE called for a single robot by name");
  robotscontroller.delete_robot_by_name(req, res);
});

module.exports = router
