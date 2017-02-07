var express	= require("express");
var app		= express();
var ping = require('ping');
var http = require('http');
var	exec = require('child_process').exec;

//Configure Express app
app.use(express.static(__dirname + "/public"));


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

require('./routes/startup.js')(app);

//Start server, listen to everything
var port = 8000;
app.listen(port, '0.0.0.0');
console.log("App listening on port " + port);
