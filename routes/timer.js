var http = require('http');
var config = require('../config')

module.exports = function(app) {
  //What time to do you the alarm to go off?
  var alarmTime = new Date(2016, 10, 3, 7, 33, 20)

  //Allow the alarm time to be set
  app.post('/alarm/set', function(req, res) {
    alarmTime = req.body.date;
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

