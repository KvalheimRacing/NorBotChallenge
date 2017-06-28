exports.start_countdown = function(req, res) {

  var action = req.body.action;
  var timerRunning = req.app.get('timer-running');
  // var timerPaused = req.app.get('timer-paused');
  //var timer

  console.log("Action: " + action);

  //Cannot start a new timer if one is allready running...
  if (action == 'start' && timerRunning)
    return res.sendStatus(409);

  //Cannot stop or pause, if no timer is running.
  // if (action == 'pause' && !timerRunning)
  //   return res.sendStatus(409);

  //Start a paused timer
  // if (action == 'start' && timerPaused) {
  //   req.app.set('timer-running', true);
  //   return res.sendStatus(200);
  // }

  //Set action
  req.app.set('timer-running', (action == 'start' ? true : undefined));
  //req.app.set('timer-paused', (action == 'pause' ? true : undefined));
  //req.app.set('timer-paused', (action == 'pause' ? true : undefined));



  var io = req.app.get('socketIO');
  if (action == 'start') {
    io.emit('onCountdownStarted', '');
  }

  var seconds = req.body.seconds ? req.body.seconds : 60 * 3;

  if (action == 'stop')
    seconds = 0;

  //Start a timer that counts down each second
  var intervalId = setInterval(function() {
      if (req.app.get('timer-running')) {
        io.emit('tick', seconds);
        if (seconds <= 0) {
          clearInterval(intervalId);
          req.app.set('timer-running', '');
          io.emit('onCountdownEnded', '');
        }
        seconds--;
      }
    },
    1000);

  res.sendStatus(200);
}
