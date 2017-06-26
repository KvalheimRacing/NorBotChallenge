var app = new Vue({
      el: '#app',
      data: {
        robots: [],
        rightCanDeleteRobot: true,
        filtertext: ''
      },
      mounted: function() {
        this.loadRobots();

        var socket = io();
        socket.on('robot-registered', function(robot) {
          app.robots.push(robot);
          console.log("Vue discovered that robot was added!");
        })
      },
      // watch: {
      //   filtertext: function(newfilter) {
      //     this.filtertext = newfilter;
      //   }
      // },
      methods: {
        getRightsTooltip: function(right, message) {
          //Used to get an tooltip text for the given right.
          //If user has the given right, then return the given message
          //Else if the user does not have the right, then return a standard denied-text.
          return (right ? message : 'You do not have enough rights!');
        },
        reverseList: function() {
          this.robots.reverse();
        },
        filteredRobots: function() {
          var value = this.filtertext;
          return this.robots.filter(function(robot){
            //Compares each of the elements in the robot list, with the filtervalue.
            return robot.name.toLowerCase().indexOf(value) !== -1
            || robot.owner.toLowerCase().indexOf(value) !== -1;
          });
        },
        deleteRobot: function(robot) {
          //Call on the backend REST API to delete the robot
          if (this.rightCanDeleteRobot && confirm('Are you SURE you want to delete ' + robot.name + '?')) {

              this.$http.delete('/api/robots/' + robot.name).then(function(response) {
                //alert('ok');
              });

              //Remove from local array on page
              var index = this.robots.indexOf(robot);
              this.robots.splice(index, 1);
            }

          },
          getHumanTime: function(datetime) {
            return moment(datetime, moment.ISO_8601).fromNow();
          },
          loadRobots: function() {
            //Get all robots from backend REST API
            this.$http.get('/api/robots').then(function(response) {
              this.robots = response.data;

            })
          }
        }
      })
