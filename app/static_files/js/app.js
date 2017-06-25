var app = new Vue({
  el: '#app',
  data: {
    robots: []
  },
  mounted: function () {
      this.loadRobots();

      var socket = io();
      socket.on('robot-registered', function(robot) {
        //$('table tr:last').after('<tr><td>' + robot.name + '</td><td>' + robot.owner + '</td></tr>');
        console.log("ROBOT REGISTERED!");
      })
   },
  methods: {
    reverseList: function() {
      this.robots.reverse();
    },
    loadRobots: function() {
      //Get all robots from backend REST API
      this.$http.get('/api/robots').then(function(response){
        this.robots = response.data;

      })
    }
  }
})
