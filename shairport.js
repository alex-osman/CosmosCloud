Shairport = {
	Album: "",
	Artist: "",
	Title: "",
	start: function() {
		console.log("Shairport")
		var fs = require('fs')
		fs.readFile("/tmp/metadata", function(err, data) {
			console.log(data.toString('ascii'));
		})
	}
}
module.exports = Shairport;