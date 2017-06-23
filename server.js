var io = require('socket.io')();
var mongo = require('mongodb').MongoClient;
var config = require('./config.json');
var assert = require('assert');

//Database
var dbUrl = 'mongodb://localhost:27017/test';


//Websever
var express = require('express')();

var insertRobot = function(db, callback) {
  db.collection('robots').insertOne( {
    "name": "testbot"
  }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted Robot in Robots");
    callback(); //wait...what? why?
  });
};

//Web API routing
express.get('/', function (req, res) {
  console.log("Route / called...");

  mongo.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    console.log("Connected to MongoDB server...");

    insertRobot(db, function() {
      db.close();
    });
  });

  res.send('Robot added')
})

//var port = 3000
express.listen(config.port)
console.log("Webserver listening on port " + config.port);
