var io = require('socket.io')();
var config = require('./config.json');

//Websever
var express = require('express')()

//Web API routing
express.get('/', function (req, res) {
  res.send('Hello World')
})

//var port = 3000
express.listen(config.port)
