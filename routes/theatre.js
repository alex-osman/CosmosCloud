var http = require('http');
var theatres = require('../modules/theatre.js')



module.exports = function(app, connection) {
  
  /*THEATRE INITIALIZATION*/
  //Very under construction
  //Hardcoded IPs
  theatres.add('10.0.0.12', 1337, 'Bedroom');
  theatres.add('10.0.0.65', 1337, 'LivingRoom');

  //Encapsulate get requests to a theatre
  //TODO: Move to Theatre.js module
  var getRequest = function(url, num, callback) {
    http.get(theatres.getOptions(url, num), function(response) {
      var body = "";
      response.on('data', function(chunk) {
        body += chunk;
      });
      response.on('end', function() {
        callback(body);
      });
    }).on('error', function(err) {
      if (err.code == 'ECONNREFUSED' | err.code == 'EHOSTUNREACH') {
        callback(err.code);
      } else throw err;
    })
  }

  /*THEATRE METHODS*/
  app.get('/getTheatres', function(req, res) {
    res.send(theatres.names)
  })

  app.get('/dbus/:num/:type/:command', function(req, res) {
    console.log('/dbus/' + req.params.type + '/' + req.params.command);
    getRequest('/dbus/' + req.params.type + '/' + req.params.command, req.params.num, function(str) {
      console.log(str);
      res.send(str);
    })
  })

  /********************************************************
   *
   *  This route is to be used by the RSSI tracker
   *  Transitions your theatre asset from 'source' to 'target'
   *
   *  Ex: /transition/0/1
   *      Simpsons is playing in living room
   *      Get asset
   *      Get position
   *      Shut down living room theatre
   *      Play asset at position in bedroom theatre
   *
   ********************************************************/
  app.get('/transition/:source/:target', function(req, res) {
    var source = parseInt(req.params.source);
    var target = parseInt(req.params.target);
    console.log("Moving video from " + source + " to " + target);
    //First get the asset from source
    getRequest('/dbus/player/GetSource', source, function(videoSrc) {
      console.log("1: " + videoSrc)
      //Get the position from source
      getRequest('/dbus/prop/Position', source, function(pos) {
        //Kill the source
        getRequest('/dbus/action/15', source, function(){})
        //Play the asset on target
        console.log(pos);
        var position = pos.split(' ')[1].trim()
        console.log("2: " + position)
        getRequest('/play/stream/' + encodeURIComponent(videoSrc), target, function(response){
          console.log("3: " + response)

          //Set the position on target
          setTimeout(function() {
            getRequest('/dbus/player/GetSource', target, function(str) {
              console.log("target is playing: " + str);
              

              console.log("Setting position")
              getRequest('/dbus/setPosition/' + position, target, function(str) {
                console.log("Got: " + str)
                res.send(str);
              })          
            })
          }, 3000) 
          //Need to allow 3 seconds for the process to start
          //How to start at a given position. Dbus is for inter-process commmunication, not on start
        })
      })
    })
  })




  /*THEATRE LIVE-STREAMS*/
  var streams = [];

  app.get('/sql/livestreams', function(req, res) {
    connection.query('SELECT * FROM Streams', function(err, rows, fields) {
      streams = rows;
      if (err) throw err;
      res.send(rows);
    })
  })

  /*THEATRE MOVIES*/
  app.get('/sql/movies', function(req, res) {
    connection.query('SELECT * FROM movies', function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    })
  })

  /*PLAY A STREAM*/
  app.get('/play/:num/stream/:id', function(req, res) {
    streams.forEach(function(stream) {
      if (stream.id == req.params.id) {
        getRequest('/play/stream/' + encodeURIComponent(stream.url), parseInt(req.params.num), function(str) {
          console.log(str);
          res.send(str);
        })
      }
    })
  })

  /*PLAY A MOVIE*/
  app.get('/play/:num/:url', function(req, res) {
    getRequest('/play/movie/' + req.params.url, parseInt(req.params.num), function(str) {
      console.log(str);
      res.send(str);
    })
  })

  /* TEST IF SHAIRPORT (HARDWARE) MODULE IS ACTUALLY SET UP */
  console.log("Trying Theatres...");
  var test = http.get('http://10.0.0.12:1337')
  test.on("error", function(err) {
    if (err.code == 'ECONNREFUSED' | err.code == 'EHOSTUNREACH') {
      console.log("Theatre is NOT running.");
    }
  })
  test.on("response", function(data) {
    console.log("Theatre running...");
  })
}