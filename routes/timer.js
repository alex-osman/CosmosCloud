var http = require('http');

module.exports = function(app, config) {
  //What time to do you the alarm to go off? - default 55 minutes
  //var alarmTime = new Date(new Date().getTime() + 1000 * 60 * 45)
  var alarmTime = new Date(2016, 10, 19, 7, 00, 00, 0);

  //Allow the alarm time to be set
  app.post('/alarm/set', function(req, res) {
    alarmTime = req.body.date;
    console.log("New alarm: " + alarmTime)
  })
  
  //Checks the alarm
  var timerCycle = function() {
    var now = new Date();
    if (now.getTime() > alarmTime.getTime())
      ring(config.pis);
    else setTimeout(timerCycle, 3000);
  }

  //Executes when alarm goes off
  var ring = function(pis) {
    console.log("Alarm!");
    if (config.rgb)
      config.rgb.on();
    
    //For every pi
    pis.forEach(function(pi) {
      //For every ring
      pi.ring.forEach(function(ring) {
        //Execute every function
        ring(pi);
      })
    })
  }
  //Start
  timerCycle();
  console.log("Timer is set for " + alarmTime)
}

