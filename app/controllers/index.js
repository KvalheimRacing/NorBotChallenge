var express = require('express');
var router = express.Router();
var Robot = require('../models/robot');

router.use('/robots2', require('./robotscontroller'))

module.exports = router
