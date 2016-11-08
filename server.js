var express	= require("express");
var bodyParser = require('body-parser')
var app		= express();
var ping = require('ping');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var http = require('http');
var	exec = require('child_process').exec;
var mysql = require("mysql");
var config = require('./config');

//Configure Express app
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json({limit: '5000mb'}))
app.use(bodyParser.urlencoded({limit: '5000mb'}))

//Configure MySQL
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'patsword',
  database: 'cosmos'
});
//Connect
connection.connect(function(err) {
  if (err) {
    console.log("Please hook up a mysql database!");
    return;
  } else {
    console.log("Database connected!") 
    //Load routes with database
    require('./routes/theatre.js')(app, connection);
    require('./routes/ledger.js')(app, connection);
    require('./routes/users.js')(app, connection);
  }
})


//Load modules
require('./routes/fileshare.js')(app, multipartMiddleware);
require('./routes/timer.js')(app, config);
require('./routes/rgb.js')(app, config);
require('./routes/relay.js')(app, config);
require('./routes/shairport.js')(app, config);
require('./routes/misc.js')(app, config);

//Start server, listen to everything
var port = 8000;
app.listen(port, '0.0.0.0');
console.log("App listening on port " + port);