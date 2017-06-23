var express = require('express');
var app = express();
var io = require('socket.io')();
var mongo = require('mongodb').MongoClient;
var config = require('./config.json');
var assert = require('assert');
var bodyParser = require('body-parser');
var router = express.Router();

//Configure Express to use the body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Database
var dbUrl = 'mongodb://localhost:27017/test';

//Websever
var express = require('express');
var app = express();

var insertRobot = function(db, callback) {
  db.collection('robots').insertOne( {
    "name": "testbot"
  }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted Robot in Robots");
    callback();
  });
};

//Web API routing
router.get('/', function (req, res) {
  console.log("Route / called...");

  mongo.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    console.log("Connected to MongoDB server...");

    insertRobot(db, function() {
      db.close();
    });
  });

  //res.send('Robot added')
  res.json({message: 'Robot added'});
})

//Fire up Express Webserver

app.use("/api", router);

var port = config.port || 8080;
app.listen(port)
console.log("Webserver listening on port " + config.port);
