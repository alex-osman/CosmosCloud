Projector = {
	names: [],
	ips: [],
	ports: [],
	http: null,
	getOptions: function(path, num) {
		return {
			host: this.getIp(num),
			port: this.getPort(num),
			path: path
		}
	},
	getIp: function(num) {
		return this.ips[num];
	},
	getPort: function(num) {
		return this.ports[num];	
	},
	init: function(http) {
		this.http = http;
	},
	add: function(ip, port, name) {
		this.ips.push(ip);
		this.ports.push(port);
		this.names.push(name);
	},
	current: function(num) {
		return this.names[num];
	}
}
module.exports = Projector;