var mongoose = require('mongoose');
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

module.exports = mongoose.model('Robot', RobotSchema);
