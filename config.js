module.exports = {
	"pis": [{
		"ip": "10.0.0.12",
		"name": "bedroomPi",
		"room": "bedroom",
    "rgb": {
      port: 8081
    },
    "relay": {
      port: 8080,
      objects: [{
        name: "Room Lights",
      }, {
        name: "LED Lights",
      }]
    },
		"ring": [
			function(pi) {
				console.log("Ring from " + pi.ip);
			}
		]
	}, {
    "ip": "10.0.0.65",
    "name": "coffeePi",
    "room": "kitchen",
    "relay": {
      port: 8080,
      objects: [{
        name: "Coffee Maker",
      }]
    },
    "ring": [
      function(pi) {
        console.log("Ring1 from " + pi.ip);
      },
      function(pi) {
        console.log("Ring2 from " + pi.ip);
      }
    ]
  }]
}