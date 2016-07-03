var express	= require("express");
var bodyParser = require('body-parser')
var app		= express();
app.use(bodyParser.json({limit: '5000mb'}))
app.use(bodyParser.urlencoded({limit: '5000mb'}))
var fs = require('fs');
var util = require('util'),
			spawn = require('child_process').spawn,
			exec = require('child_process').exec,
			child;

var movie_folder = "public/assets/movies/"
var picture_folder = "public/assets/pictures/"
var doc_folder = "public/assets/docs/"
var music_folder = "public/assets/music/"

var isPlaying = false;
var currentlyPlaying = "none";
var pid;

var killOmxplayer = function() {
	exec('pkill -f omxplayer');
	isPlaying = false;
	currentlyPlaying = "none"
	pid = null;
}

var startOmxplayer = function(url) {
	killOmxplayer();
	fs.writeFile('FIFO', '', function(err) {if (err) throw err;})
	pid = exec('omxplayer -b -o local ' + url + ' < FIFO').pid;
	currentlyPlaying = url;
	isPlaying = true;
	console.log("Playing " + url);
}


var startStream = function(stream) {
	startOmxplayer("'" + stream + "'")
}

var startSong = function(song) {
	startOmxplayer(music_folder + song.replace(/ /g, '\\ '))
}

var startMovie = function(movie) {
	startOmxplayer(movie_folder + movie)
}

var command = function(command) {
	switch(command) {
		case 'up':
			command = "$'\e'[A"
			break;
		case 'down':
			command = "$'\e'[B"
			break;
		case 'right':
			command = "$'\e'[C"
			break;
		case 'left':
			command = "$'\e'[D"
			break;
		case 'q':
			killOmxplayer();
			return "killed";
			break;
	}


	fs.appendFile('FIFO', command, function(err) {if (err) throw err;})
}

app.get('/api/command/:command', function(req, res) {
	res.send(command(req.params.command));
})

app.post('/api/stream', function(req, res) {
	startStream(req.body.url);
	res.send("ok1");
})

app.get('/api/music/:song', function(req, res) {
	startSong(req.params.song);
	res.send("ok2")
})

app.get('/api/movie/:movie', function(req, res) {
	startOmxplayer(req.params.movie)
	res.send("ok3");
})

app.get('/api/status', function(req, res) {
	console.log("sending status");
	res.send(JSON.stringify({
		"isPlaying": isPlaying,
		"currentlyPlaying": currentlyPlaying,
		"pid": pid
	}));
})

app.listen(1337, '0.0.0.0');
console.log("Listening for traffic on 1337")
