function Projector(ip) {
	this.ip = ip;
	this.port = 1337;
	console.log("Projector " + ip + " initialized")
}

Projector.prototype = {
	getIp: function() {
		return this.ip;
	},
	setIp: function(ip) {
		this.ip = ip;
	}
	command: function(command) {
		http.get({host: this.ip,port: this.port,path: "/api/command/" + command}, function(data) {
			return data;
		})
	},
	stream: function(stream) {
		http.post({host: this.ip, port: this.port, path: "/api/stream"}, {url: stream}, function(data) {
			return data;
		})
	},
	music: function(song) {
		http.get({host: this.ip,port: this.port,path: "/api/music/" + song}, function(data) {
			return data;
		})	
	},
	movie: function(movie) {
		http.get({host: this.ip,port: this.port,path: "/api/movie/" + movie}, function(data) {
			return data;
		})
	},
	status: function(movie) {
		http.get({host: this.ip, port: this.port, path: "/api/status"}, function(data) {
			return data;
		})
	}
}

module.exports = Projector;