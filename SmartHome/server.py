#!/usr/bin/python

import SmartHome
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from os import curdir, sep

PORT_NUMBER = 8080

#This handles HTTP Requests
class myHandler(BaseHTTPRequestHandler):
	#GET Requests
	def do_GET(self):
		self.send_response(200)
		self.send_header('Content-type', 'text/html')
		self.end_headers()
		print(self.path)
		if (self.path == "/turnOn"):
			relay.turnOn(0)
		elif self.path == "/turnOff":
			relay.turnOff(0)
		elif self.path == "/toggle":
			relay.toggle(0)
		self.wfile.write(relay.status())
		return

try:
	#Create web server and define the request handler
	server = HTTPServer(('', PORT_NUMBER), myHandler)
	print 'Started httpserver on port ' , PORT_NUMBER
	gpio = SmartHome.Gpio()
	relay = SmartHome.Relay([17, 27])
	relay.wave()
	
	server.serve_forever()

except KeyboardInterrupt:
	print '^C received, shutting down the web server'
	server.socket.close()
