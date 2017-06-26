var app = new Vue({
  el: '#app',
  data: {
    robots: []
  },
  mounted: function () {
      this.loadRobots();

      var socket = io();
      socket.on('robot-registered', function(robot) {
        app.robots.push(robot);
        console.log("Vue discovered that robot was added!");
      })
   },
  methods: {
    reverseList: function() {
      this.robots.reverse();
    },
    deleteRobot: function(robot) {
      //Call on the backend REST API to delete the robot
      this.$http.delete('/api/robots/' + robot.name).then(function(response) {
        //alert('ok');
      });

      //Remove from local array on page
      var index = this.robots.indexOf(robot);
      this.robots.splice(index, 1);
    },
    loadRobots: function() {
      //Get all robots from backend REST API
      this.$http.get('/api/robots').then(function(response){
        this.robots = response.data;

      })
    }
  }
})
