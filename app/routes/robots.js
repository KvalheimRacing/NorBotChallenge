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
  robotscontroller.delete_all_robots(req, res);
});

router.delete('/api/robots/:name', function(req,res) {
  robotscontroller.delete_robot_by_name(req, res);
});

module.exports = router
