var app = new Vue({
  el: '#app',
  data: {
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
    }
  }
});
