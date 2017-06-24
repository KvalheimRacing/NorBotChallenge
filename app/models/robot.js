var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RobotSchema = new Schema({
  name: {
    type: String,
    Required: 'A robot must have a name'
  },
  owner: String,
  team: String,
  createddate: {
    type: Date,
    default: Date.now
  },
  country: String
});

module.exports = mongoose.model('Robot', RobotSchema);
