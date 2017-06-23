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

exports.create_robot = function(req, res) {
  var robot = new Robot();
  robot.name = req.body.name;
  robot.country = req.body.country;

  robot.save(function(err) {
      if (err)
        res.send(err);
  });

  res.sendStatus(200);
}
