Projector = {
	ip: "10.0.0.0",
	port: "1337",
	http: null,
	getIp: function() {
		return this.ip;
	},
	setIp: function(ip) {
		this.ip = ip;
	},
	command: function(command) {
		this.http.get({host: this.ip,port: this.port,path: "/api/command/" + command}, function(data) {
			return data;
		})
	},
	stream: function(stream) {
		this.http.post({host: this.ip, port: this.port, path: "/api/stream"}, {url: stream}, function(data) {
			return data;
		})
	},
	music: function(song) {
		this.http.get({host: this.ip,port: this.port,path: "/api/music/" + song}, function(data) {
			return data;
		})	
	},
	movie: function(movie) {
		this.http.get({host: this.ip,port: this.port,path: "/api/movie/" + movie}, function(data) {
			return data;
		})
	},
	getStatus: function(movie) {
		this.http.get({host: this.ip, port: this.port, path: "/api/status"}, function(data) {
			return data;
		})
	}
}

module.exports = Projector;
