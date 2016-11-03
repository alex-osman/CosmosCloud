var http = require('http');
var config = require('../config');

module.exports = function(app) {


  //Do :ACTION on #:PI on relay channel #:ID
  //Ex: /relay/on/0/0 - turn on pi_0's 0th channel
  //Ex: /relay/toggle/1/3 - toggle pi_1's 3rd channel
  app.get('/relay/:action/:pi/:channel', function(req, res) {
    var pi = config.pis[parseInt(req.params.pi)];
    var action = req.params.action;
    var channel = req.params.channel;

    console.log("http://" + pi.ip + ":" + pi.relay.port + "/" + action + channel);

    http.get("http://" + pi.ip + ":" + pi.relay.port + "/" + action + channel, function(response) {
      var body = '';
      response.on('data', (d) => {body += d;});
      response.on('end', function() {
        res.send(body);
      })
    });
  })
}