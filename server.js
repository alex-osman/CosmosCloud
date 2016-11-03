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
	user: 'root',
	password: 'patsword',
	database: 'cosmos'
});
connection.connect()
app.use(express.static(__dirname + "/public"));

/*THEATRE*/
/*THEATRE INITIALIZATION*/
var theatres = require('./theatre.js')
theatres.add('10.0.0.12', 1337, 'Bedroom');
theatres.add('10.0.0.88', 1337, 'LivingRoom');

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
 *	This route is to be used by the RSSI tracker
 *	Transitions your theatre asset from 'source' to 'target'
 *
 *	Ex: /transition/0/1
 *			Simpsons is playing in living room
 *			Get asset
 *			Get position
 *			Shut down living room theatre
 *			Play asset at position in bedroom theatre
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

app.get('/play/:num/:url', function(req, res) {
	getRequest('/play/movie/' + req.params.url, parseInt(req.params.num), function(str) {
		console.log(str);
		res.send(str);
	})
})

/*END THEATRE*/





/*LEDGER MODULE*/
app.get("/ledger/SQL", function(req, res) {
	connection.query('SELECT * FROM ledger', function(err, rows, fields) {
		if (err)
			throw err;
		res.send(rows);
	})
})

/*END LEDGER*/



/*USERS*/
var users = [];

connection.query('SELECT * FROM Users', function(err, rows, fields) {
	users = rows;
	pingUsers();
})

//Pings every user in users to see if Alive or not.  Records the last time they were alive
var pingUsers = function() {
	users.forEach(function(host) {
		if (host.ping == 1) {
			ping.sys.probe(host.IP, function(isAlive) {
				host.isAlive = isAlive;
				if (isAlive) {
					connection.query("UPDATE Users SET time='" + new Date().getTime() + "' WHERE id='" + host.id + "';", function(err, rows, fields) {
						console.log("Added time to " + host.Name)
					})
				}
			})
		}
	})
	//Ping users every 30 seconds
	setTimeout(pingUsers, 30000);
}

app.get('/users', function(req, res) {
	connection.query('SELECT * FROM Users', function(err, rows, fields) {
		users = rows;
		res.send(users);
		console.log("sent users to client");
	})	
})
/*END USERS*/





/*SHAIRPORT*/

app.get('/shairport/metadata', function(req, res) {
	http.get('http://10.0.0.90:8081/metadata', function(response) {
		var body = "";
		response.on('data', function(chunk) {
			body += chunk;
		});
		response.on('end', function() {
			res.send(body);
		});
	}).on('error', function(err) {
		if (err.code == 'ECONNREFUSED' | err.code == 'EHOSTUNREACH') {
			res.send(err.code);
		} else throw err;
	})
})

/*END SHAIRPORT*/




/*TIMER*/
var timer = function(callback, time) {
	console.log("Testing: " + time + " at " + new Date());
	if (new Date().getTime() > time.getTime()) {
		callback()
	} else {
		setTimeout(function() {
			timer(callback, time)
		}, 3000)
	}
}

var runTimer = function(date) {
	timer(function() {
		console.log("ALARM ALARM ALARM");
		http.get('http://10.0.0.65:8080/on')
		http.get('http://10.0.0.12:8080/on0')
	}, date)
}

runTimer(new Date(2016, 10, 4, 7, 30, 0));

app.post('/alarm/set', function(req, res) {
	var post = req.body;
	runTimer(post.date);
})
/*END TIMER*/





var port = 8000;
app.listen(port, '0.0.0.0');
console.log("App listening on port " + port);