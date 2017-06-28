var app = new Vue({
  el: '#app',
  data: {
  },
  methods: {
    startCountdown: function() {
      this.$http.post('/api/racetimer', {'action': 'start', 'seconds': 8}).then(function() {
        console.log("Started");
      });
    },
    pauseCountdown: function() {
      this.$http.post('/api/racetimer', {'action': 'pause'}).then(function() {
        console.log("Paused");
      })
    },
    stopCountdown: function() {
      this.$http.post('/api/racetimer', {'action': 'stop'}).then(function() {
        console.log("Stopped");
      })
    }
  }
});
