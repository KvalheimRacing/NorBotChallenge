var app = new Vue({
  el: '#app',
  data: {
    registration: {
      robotname: '',
      humanfirstname: '',
      humanlastname: '',
      teamname: '',
      competitions: ''
    },
    progress: 50,
    // robot: {
    //   name: '',
    //   owner: '',
    // },
    teams: [],
    competitions: [{
        value: 'f',
        label: 'Folkrace'
      },
      {
        value: 'ms',
        label: 'MiniSumo'
      },
      {
        value: 'ls',
        label: 'LegoSumo'
      },
      {
        value: 'lf',
        label: 'Line Follower'
      },
      {
        value: 'fs',
        label: 'Freestyle'
      }
    ]
  },
  mounted: function() { //Fired as soon as page is done loading
    this.loadTeams();
  },
  // watch: {
  //   teams: function(value) {
  //     this.progress+=10;
  //   }
  // },
  methods: {
    loadTeams: function() {
      this.$http.get('/api/teams').then(function(response) {
        this.teams = response.data;
      })
    },
    getTeams: function(search, callback) {
      //var result = [{value: "test", link: "http://www.vg.no"}];
      //callback(result);
      callback(this.teams.sort(function(a, b) {
        return a.name.toLowerCase() > b.name.toLowerCase();
      }));
    },
    teamSelected: function(team) {
      console.log('Team selected: ' + team.name);
    },
    registerRobot: function(registration) {
      //alert('todo: post to server' + robot.name);
      this.$http.post('/api/robots', registration).then(function(response) {
        console.log("Robot created");
        this.$http.post('/api/teams', registration).then(function(response) {
          console.log("Team created");
        })
      })
    }
  }
});
