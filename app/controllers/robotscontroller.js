/*
 * This file is responsible to all CRUD operations for robos
 * IF you need to create, change, get etc robots, then that is done by this file
 */
var mongoose = require('mongoose');
var Robot = mongoose.model('Robot');

exports.list_all_robots = function(req, res) {
  Robot.find({}, function(err, robots) {
    if (err) {
      res.send(err);
    }

    res.send(robots);
  });
};

exports.create_robot = function(data) {

  var robot = new Robot();

  robot._id = data.name;
  robot.name = data.name;
  robot.owner = data.owner;
  robot.team = data.team;
  robot.country = data.country;

  robot.save(function(err){
    if (err) return err;
    else {
      return robot;
    }
  })
};

// exports.create_robot = function(req, res) {
//   var robot = new Robot();
//   robot.name = req.body.name;
//   robot.country = req.body.country;
//
//   robot.save(function(err) {
//     if (err) {
//       //console.log("error while saving:");
//       //console.log(err);
//       res.send(err);
//     } else {
//       res.sendStatus(201);
//     }
//   });
// }

// exports.delete_robot_by_name = function(req, res) {
//   //console.log("delete_robot_by_name called");
//   Robot.remove({
//     name: req.params.name
//   }, function(err) {
//     if (err) res.send(err);
//     else res.sendStatus(204);
//   });
// }

exports.delete_robot_by_name = function(name) {
  console.log("delete_robot_by_name(" + name + ")");
  Robot.remove({
    name: name
  }, function(err) {
    if (err) return err;
    else return true;
  });

  //return true;
}

exports.delete_all_robots = function(req, res) {
  Robot.remove({}, function(err) {
    if (err)
      res.send(err);
    else {
      res.sendStatus(204);
    }
  });
}
