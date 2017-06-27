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

exports.create_team = function(req, res) {
  var team = new Team();
  team._id = req.body.teamname;
  team.name = req.body.teamname;
  team.save(function(err){
    if (err) res.send(err);
    else {
      var io = req.app.get('socketIO');
      io.emit('onTeamCreated', team);
      res.sendStatus(201);
    }
  })
}
