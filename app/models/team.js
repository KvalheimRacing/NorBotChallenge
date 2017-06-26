var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TeamSchema = new Schema({
  _id: String,
  name: {
    type: String,
    Required: 'No team is complete without a fancy name',
    unique: true
  },
  createddate: {
    type: Date,
    default: Date.now
  },
  country: String
});

module.exports = mongoose.model('Team', TeamSchema);
