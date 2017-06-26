var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RobotSchema = new Schema({
  _id: String,
  name: {
    type: String,
    Required: 'A robot must have a name',
    unique: true
  },
  owner: String,
  team: String,
  createddate: {
    type: Date,
    default: Date.now
  },
  country: String,
  participant_id: String
});

module.exports = mongoose.model('Robot', RobotSchema);
