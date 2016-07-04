Projector = {
	ip: "10.0.0.0",
	port: "1337",
	http: null,
	setHttp: function(req) {
		this.http = req;
	},
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
		console.log("trying to stream " + stream);
		var body = JSON.stringify({url: stream});
		var req = this.http.request({
			host: this.ip, 
			port: this.port, 
			path: "/api/stream",
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		});
		req.end(body)
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
