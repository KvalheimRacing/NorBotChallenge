var app = new Vue({
  el: '#app',
  data: {
    robot: {
      name: '',
      owner: '',
    },
    teams: []
  },
  mounted: function() { //Fired as soon as page is done loading
    this.loadTeams();
  },
  methods: {
    loadTeams: function() {
      this.$http.get('/api/teams').then(function(response) {
        this.teams = response.data;
      })
    },
    registerRobot: function(robot) {
      //alert('todo: post to server' + robot.name);
      this.$http.post('/api/robots', robot).then(function(response){
        console.log("done");
      })
    }
  }
});
