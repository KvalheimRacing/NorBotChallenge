//Generic
var config = require('./config.json');
var assert = require('assert');

//Webserver
var express = require('express');
var app = express();
var io = require('socket.io')();
var bodyParser = require('body-parser');

//Database
var mongoose = require('mongoose');
var mongoDbUrl = config.mongodb || 'mongodb://localhost:27017/norbot';

mongoose.connect(mongoDbUrl, function(err, db) {
   assert.equal(null, err);
   console.log("Connected to MongoDB server...");
 });

var Robot = require('./app/models/robot');

mongoose.Promise = global.Promise;
//mongoose.Promise = require('bluebird');

//Configure Express to use the body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(require('./app/routes/robots'));
app.use(require('./app/controllers'));

// app.get('/test', function(req, res) {
//   Robot.find({}, function(err, robots){
//     if (err)
//       res.send(err);
//
//     res.send(robots);
//     //res.json({found: "something"});
//   });
//   //res.json({allright: "there"});
// });
/*
//Router middleware
router.use(function(req, res, next) {
  console.log("Incoming request captured by middleware...");
  next();
});

//Web API routing
router.get('/', function (req, res) {
  console.log("Route / called...");

  // mongo.connect(mongoDbUrl, function(err, db) {
  //   assert.equal(null, err);
  //   console.log("Connected to MongoDB server...");
  //
  //   insertRobot(db, function() {
  //     db.close();
  //   });
  // });

  res.json({message: 'not used'});
})

router.route('/robots')
.post(function(req, res){
  //Create a robot
  //console.log("/robots called using POST")
  var robot = new Robot();
  robot.name = req.body.name;
  robot.save(function(err) {
     if (err)
       res.send(err);

     res.json({message: 'Robot created'});
   });

   res.json({"message": "Was robot " + robot.name + " created?"});
}).get(function(req, res) {
  //Get ALL robots
  console.log("GET");
  Robot.find(function(err, robots) {
    console.log("find...");
    if (err)
      res.send(err);

    res.json(robots);
  });

  res.json({test:"test2"});
});

router.route('/robots/:robot_id')
  .get(function(req, res) {
    Robot.findById(req.params.robot_id, function(err, robot) {
      if (err)
        res.send(err);
      res.json(robot);
    });

    //res.json({robot: "somerobot"});
  });

//Get all robots


//Fire up Express Webserver
app.use("/api", router);

*/

var port = config.port || 8080;
var server = app.listen(port, function() {
  console.log("Webserver listening on port " + config.port);
});
