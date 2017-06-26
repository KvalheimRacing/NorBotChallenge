var mongoose = require('mongoose');
var Team = mongoose.model('Team');

exports.get_all_teams = function(req, res) {
  Team.find({}, function(err, teams) {
    //console.log("Teams -> " + teams)
    if (err)
      return res.send(err);
    else
      return res.send(teams);
  });
};
