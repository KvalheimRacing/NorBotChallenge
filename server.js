//Generic
var config = require('./config.json');
var assert = require('assert');
var path = require('path');

//Webserver
//var express = require('express');
//var http = require('http').Server(express);
//var app = express();
var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

//Database
var mongoose = require('mongoose');
var mongoDbUrl = config.mongodb || 'mongodb://localhost:27017/norbot';

mongoose.connect(mongoDbUrl, function(err, db) {
  assert.equal(null, err);
  console.log("Connected to MongoDB server...");
});

var Robot = require('./app/models/robot');
var robotscontroller = require('./app/controllers/robotscontroller');

io.on('connection', function(socket) {
  console.log("A Socket.IO client just connected!");

  socket.on('register-robot', function(robot) {
    console.log("Register robot called");
    console.log("Robot: " + JSON.stringify(robot));

    //Save to database
    var r = new Robot();
    r.name = robot.name;
    r.owner = robot.owner;
    r.team = robot.team;
    r.country = robot.country;
    r.save(function(err) {
      if (err)
        res.send(err);
    });

    //Inform any listening clients
    io.emit('robot-registered', robot);
  });

  socket.on('delete-robot', function(robot) {

    var result = robotscontroller.delete_robot_by_name(robot.name);
    if (result == true)
      io.emit('robot-deleted', robot);
    else {
      console.log(result);
    }
  });

  socket.on('disconnect', function() {
    console.log("Socket.IO client Disconnected");
  })
});



mongoose.Promise = global.Promise;
//mongoose.Promise = require('bluebird');

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

//Configure Express to use the body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static('app/public'));

app.use(require('./app/routes/robots'));
app.use(require('./app/controllers'));

app.get("/admin", function(req, res) {
  res.render('admin', {
    title: "Hello Admin",
    message: "something"
  });
})

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
server.listen(port, function() {
  console.log("Webserver listening on port " + config.port);
});
