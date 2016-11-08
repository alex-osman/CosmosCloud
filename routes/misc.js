var http = require('http');

module.exports = function(app, config) {


  app.get('/night', function(req, res) {
    if (config.rgb)
      config.rgb.off();

    //How would I turn off all the lights
    //Turn off all rgb
    //Make sure alarm is set for tomorrow morning
    config.pis.forEach(function(pi) {
      if (pi.relay) {
        for (var i = 0; i < pi.relay.objects.length; i++) {
          var object = pi.relay.objects[i];
          console.log(object);
          if (object.isLight) {
            var q = http.get('http://' + pi.ip + ':' + pi.relay.port + '/off' + i);
            q.on('error', function(err) {
              console.log("Error going to bed....");
            })
          } else if (object.name == "Coffee Maker") {
            var q = http.get('http://' + pi.ip + ':' + pi.relay.port + '/off');
            q.on('error', function(err) {
              console.log("Error going to bed....");
            })
          }
        }
      }
    })
    res.send("good night");
  })
}