var express	= require("express");
var app		= express();
var ping = require('ping');
var http = require('http');
var	exec = require('child_process').exec;
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

//Configure Express app
app.use(express.static(__dirname + "/public"));

//Configure database;
MongoClient.connect('mongodb://localhost:27017/myproject', function(err, db) {
  assert.equal(null, err);
  console.log("Mongo Connection Successful")
  require('./routes/startup.js')(app, db);
})

//Load modules
/*
require('./routes/theatre.js')(app, connection);
require('./routes/ledger.js')(app, connection);
require('./routes/users.js')(app, connection); 
require('./routes/fileshare.js')(app, multipartMiddleware);
require('./routes/timer.js')(app, config);
require('./routes/rgb.js')(app, config);
require('./routes/relay.js')(app, config);
require('./routes/shairport.js')(app, config);
require('./routes/misc.js')(app, config);*/



//Start server, listen to everything
var port = 8888;
app.listen(port, '0.0.0.0');
console.log("App listening on port " + port);
