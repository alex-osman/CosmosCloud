var http = require('http');

module.exports = function(app, config) {
  //Set globals
  config.rgb = {
    on: function() {
      getWeather = true;
      getTemp(config.pis);
    },
    off: function() {
      getWeather = false;
      runCommand(config.pis, "rgb", "off");
    }
  }
  updateWeather(config.pis);


  //Turns off the light
  app.get('/rgb/off', function(req, res) {
    getWeather = false;
    runCommand(config.pis, "rgb", "off");    
    res.send("okay");
  })

  //Turns on the light
  app.get('/rgb/on', function(req, res) {
    getWeather = true;
    getTemp(config.pis);
    res.send("okay");
  })

  app.get('/rgb/toggle', function(req, res) {
    if (getWeather) {
      getWeather = false;
      runCommand(config.pis, "rgb", "off");
      res.send("okay");
    } else {
      getWeather = true;
      getTemp(config.pis);
      res.send("okay");
    }
  })
}

//Runs the request to api.wunderground - don't steal my api key
var getTemp = function(pis) {
  http.get('http://api.wunderground.com/api/8f3ad647b3101ad1/conditions/q/PA/Philadelphia.json', function (response) {
    var body = "";
    response.on("data", function(chunk) {
      body += chunk;
    })
    response.on("end", function() {
      var weather = JSON.parse(body).current_observation;
      var temp = weather.temp_f;
      var red = parseInt(100 - ((3.333) * temp - 133));
      var green = parseInt(100 - (-Math.abs((3.33) * (temp-40)) + 100));
      var blue = parseInt(100 - ((-3.333) * temp + 133));

      if (blue > 99)
        blue = 99;
      if (green > 99)
        green = 99;
      if (red > 99)
        red = 99;
      if (blue < 0)
        blue = 0;
      if (green < 0)
        green = 0;
      if (red < 0)
        red = 0;

      var r = "" + red;
      var g = "" + green;
      var b = "" + blue;
      if (r.length == 1)
        r = "0" + r;
      if (g.length == 1)
        g = "0" + g;
      if (b.length == 1)
        b = "0" + b;
      pis.forEach(function(pi) {
        if (pi.rgb) {
          var q = http.get('http://' + pi.ip + ":" + pi.rgb.port + "/" + r + g + b);
          q.on('error', function(err) {
            console.log("Mini error going to bed...");
          })
        }
      })
    })
  })
}

//Initialize to true
var getWeather = true;
//Keep checking the weather and updating the light
var updateWeather = function(pis) {
  console.log("getWeather: " + getWeather)
  if (getWeather) {
    getTemp(pis)
  }
  //update every 15 minutes - that's how often weather underground API refreshes
  setTimeout(function(){updateWeather(pis)}, 1*20*1000);
}



var runCommand = function(pis, module, command) {
  console.log("runCommand: " + pis.length + module + command);
  pis.forEach(function(pi) {
    if (pi[module]) {
      var q = http.get('http://' + pi.ip + ":" + pi[module].port + "/" + command);
      q.on('error', function(err) {
        console.log("error: " + err);
      })
    }
  })
}