/*
 * This is the main startup point for the entire app.
 * Express is started (at port 8080) and handles incoming HTTP-requests.
 * All requests going to /api is handled by the REST API, which in turn uses the MongoDB database.
 * All other requests are treated as requests for resources, like webpages, scripts, etc.
 */
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
var moment = require('moment');

//Database
var mongoose = require('mongoose');
var mongoDbUrl = config.mongodb || 'mongodb://localhost:27017/norbot';
console.log("Connecting to " + mongoDbUrl);
mongoose.connect(mongoDbUrl, function(err, db) {
  assert.equal(null, err);
  console.log("Connected to MongoDB server...");
});

var Robot = require('./models/robot');
var Team = require('./models/team');
var robotscontroller = require('./controllers/robotscontroller');

//Save the io-object, so that it can be reused by the routes later.
app.set('socketIO', io);
// var seconds = 10; //60*3;
// var intervalId = setInterval(function() {
//   seconds--;
//   io.emit('tick', seconds);
//   if (seconds <= 0)
//     clearInterval(intervalId);
// }, 1000);

// //Socket.IO connection.
// io.on('connection', function(socket) {
//   console.log("A Socket.IO client just connected!");
//
//   socket.on('register-robot', function(registration) {
//     console.log("Register robot called");
//     console.log("registration: " + JSON.stringify(registration));
//
//     //Save to database
//     var team = new Team();
//     team._id = registration.team;
//     team.name = registration.team;
//     team.save(function(err){
//       if (err)
//         console.log(err);
//     })
//
//     // var robot = new Robot();
//     // robot.name = registration.name;
//     // robot.owner = registration.owner;
//     // robot.team = registration.team;
//     // robot.country = registration.country;
//     // robot._id = registration.name;
//     // robot.save(function(err) {
//     //   if (err)
//     //     console.log(err);
//     // });
//     var robot = robotscontroller.create_robot(registration);
//     if (robot != true)
//       console.log(robot);
//
//     //Inform any listening clients
//     io.emit('robot-registered', robot);
//   });
//
//   socket.on('delete-robot', function(robot) {
//
//     var result = robotscontroller.delete_robot_by_name(robot.name);
//     if (result == true)
//       io.emit('robot-deleted', robot);
//     else {
//       console.log(result);
//     }
//   });
//
//   socket.on('disconnect', function() {
//     console.log("Socket.IO client Disconnected");
//   })
// });

mongoose.Promise = global.Promise;

/********* CONFIGURE EXPRESS *********/
//Use Pug as the template engine
console.log(__dirname);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Configure Express to use the body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Configure express to serve static files
app.use(express.static('app/static_files'));
app.use(require('./routes'));
app.use(require('./controllers'));

//Testing Pug
app.get("/admin", function(req, res) {
  res.render('admin', {
    title: "Hello Admin",
    message: "something"
  });
})

var port = config.port || 8080;
server.listen(port, function() {
  console.log("Webserver listening on port " + config.port);
});
