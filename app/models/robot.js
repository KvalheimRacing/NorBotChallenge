var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RobotSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Robot', RobotSchema);
