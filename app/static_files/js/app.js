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
    loadRobots: function() {
      //Get all robots from backend REST API
      this.$http.get('/api/robots').then(function(response){
        this.robots = response.data;

      })
    }
  }
})
