var express = require('express');
var Shairport = require('./shairport.js')
var shairport = new Shairport();
shairport.getData(function() {
	console.log("Song: " + this.title)
	console.log("By: " + this.artist)
	console.log(this.album)
});
var app = express();

app.get('/metadata', function(req, res) {
	shairport.getData(function() {
		res.send({
			title: this.title,
			artist: this.artist,
			album: this.album
		})
	})
})
app.listen(8081, '0.0.0.0');