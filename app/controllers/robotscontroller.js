var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  res.json({message: "from robotcontroller"});
})

module.exports = router
