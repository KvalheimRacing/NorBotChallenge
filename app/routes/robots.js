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
})

module.exports = router
