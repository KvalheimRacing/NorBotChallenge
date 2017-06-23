var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoDbUrl = 'mongodb://localhost:27017/norbot';

mongoose.connect(mongoDbUrl, function(err, db) {
   //assert.equal(null, err);
   console.log("Connected to MongoDB server...");
 });

var Schema = mongoose.Schema;
var RobotSchema = new Schema({
  name: {
    type: String,
    Required: 'A robot must have a name'
  },
  CreatedDate: {
    type: Date,
    default: Date.now
  }
});
var Robot = mongoose.model('Robot', RobotSchema);

mongoose.Promise = require('bluebird');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/test', function(req, res) {
  Robot.find({}, function(err, robots){
    if (err)
      res.send(err);

    res.send(robots);
    //res.json({found: "something"});
  });

  //res.json({allright: "there"});
});

var port = 8080;
var server = app.listen(port, function() {
  console.log("Webserver listening on port " + port);
});
