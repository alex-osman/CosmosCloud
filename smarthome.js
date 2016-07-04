smartHome = {
	ip: "10.0.0.64",
	port: "8080",
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
	toggle: function(num) {
		return(this.http.get({host: this.ip, port: this.port, path: "/toggle" + num}, function(data) {
			return data;
		}))
	},
	getStatus: function() {
		return(this.http.get({host: this.ip, port: this.port, path: "/status"}, function(data) {
			return data;
		}))
	},
	turnOff: function(num) {
		return(this.http.get({host: this.ip, port: this.port, path: "/turnOff" + num}, function(data) {
			return data;
		}))
	},
	turnOn: function(num) {
		return(this.http.get({host: this.ip, port: this.port, path: "/turnOn" + num}, function(data) {
			return data;
		}))
	}
}

module.exports = smartHome;
