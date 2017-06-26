/*
 * This file is responsible for mapping HTTP routes to methods on Controllers.
 */
'use strict';
var express = require('express');
var router = express.Router();
var robotscontroller = require('../controllers/robotscontroller');

router.get('/api/robots', function(req, res) {
  robotscontroller.list_all_robots(req, res);
});

router.post('/api/robots', function(req, res) {
  robotscontroller.create_robot(req, res);
});

router.delete('/api/robots', function(req, res) {
  console.log("delete ALL robots called");
  robotscontroller.delete_all_robots(req, res);
});

router.delete('/api/robots/:name', function(req,res) {
  //console.log("delete a single robot by name called");
  //console.log(JSON.stringify(req));
  if (robotscontroller.delete_robot_by_name(req.params.name) == true)
    res.sendStatus(200);
  else {
    res.sendStatus(500);
  }
});

module.exports = router
