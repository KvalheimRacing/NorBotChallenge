/*
 * This file is responsible for mapping HTTP routes to methods on Controllers.
 */
//'use strict';
var express = require('express');
var router = express.Router();
var robotscontroller = require('../controllers/robotscontroller');
var teamsController = require('../controllers/teamscontroller');

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
  var io = req.app.get('socketIO');
  io.emit('hello', 'world');

  var result = robotscontroller.delete_robot_by_name(req.params.name);
  console.log("RESULT");
  console.log(result);
  if (result == true)
    res.sendStatus(200);
  else {
    res.sendStatus(500);
  }
});

router.get('/api/teams', function(req, res){
  // var teams =
  teamsController.get_all_teams(req, res);
  // if (teams)
  //   res.json(teams);
  // else
  //   res.send(teams);
});

router.post('/api/teams', function(req, res) {
  teamsController.create_team(req, res);
})

module.exports = router
