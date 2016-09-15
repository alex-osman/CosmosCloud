var Shairport = require('./shairport.js')
var shairport = new Shairport();
shairport.getData(function() {
	console.log("Song: " + this.title)
	console.log("By: " + this.artist)
	console.log(this.album)
});