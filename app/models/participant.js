var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ParticipantSchema = new Schema({
  _id: String,
  firstname: {
    type: String,
    Required: 'Surely, your parents gave you a firstname?'
  },
  lastname: String,
  phone: String,
  email: String,
  createddate: {
    type: Date,
    default: Date.now
  },
  country: String,
  team_id: String
});

module.exports = mongoose.model('Participant', ParticipantSchema);
