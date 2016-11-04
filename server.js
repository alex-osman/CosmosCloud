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

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'rootz',
	password: 'patsword',
	database: 'cosmos'
});
connection.connect(function(err) {
  if (err) {
    console.log("Please hook up a mysql database!");
    return;
  } else {
    console.log("Database connected") 
    //Load routes with database
    require('./routes/theatre.js')(app, connection);
    require('./routes/ledger.js')(app, connection);
    require('./routes/users.js')(app, connection);
  }
})

app.use(express.static(__dirname + "/public"));

//Load user routes
require('./routes/shairport.js')(app);
require('./routes/timer.js')(app);
require('./routes/relay.js')(app);
require('./routes/rgb.js')(app);


var port = 8000;
app.listen(port, '0.0.0.0');
console.log("App listening on port " + port);