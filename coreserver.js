var express	= require("express");
var bodyParser = require('body-parser')
var app		= express();
//app.use(bodyParser.json({limit: '5000mb'}))
//app.use(bodyParser.urlencoded({limit: '5000mb'}))
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var http = require('http');
var	exec = require('child_process').exec;
var mysql = require("mysql");
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'patsword',
	database: 'cosmos'
});
connection.connect()
app.use(express.static(__dirname + "/public"));

/*THEATRE SETUP*/
var theatres = require('./theatre.js')
theatres.init(http);
theatres.add('10.0.0.12', 1337, 'Bedroom');
theatres.add('10.0.0.88', 1337, 'LivingRoom');

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
		if (err.code == 'ECONNREFUSED') {
			callback(err.code);
		} else throw err;
	})
}

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

app.get('/test', function(req, res) {
	getRequest('/playurl/poke29.mkv', 0, function(str) {
		console.log(str);
		res.send(str);
	})
})

app.get('/transition/:source/:target', function(req, res) {
	var source = parseInt(req.params.source);
	var target = parseInt(req.params.target);
	console.log("Moving video from " + source + " to " + target);
	//First get the asset from source
	getRequest('/dbus/player/GetSource', source, function(videoSrc) {
		console.log("1: " + videoSrc)
		//Get the position from source
		getRequest('/dbus/prop/Position', source, function(pos) {
			//Play the asset on target
			var position = pos.split(' ')[1].trim()
			console.log("2: " + position)
			getRequest('/playurl/' + videoSrc, target, function(response){
				console.log("3: " + response)
				//Set the position on target
				setTimeout(function() {
					console.log("Setting position")
					getRequest('/dbus/player/SetPosition%20' + position, target, function(str) {
						console.log("Got: " + str)
						res.send(str);
					})					
				}, 2000)
			})
		})
	})
})

var port = 8000;
app.listen(port, '0.0.0.0');
console.log("App listening on port " + port);
