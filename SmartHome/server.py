#!/usr/bin/python

import SmartHome
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from os import curdir, sep
from time import time

PORT_NUMBER = 8080

#This handles HTTP Requests
class myHandler(BaseHTTPRequestHandler):
	#GET Requests
	def do_GET(self):
		self.send_response(200)
		self.send_header('Content-type', 'text/html')
		self.end_headers()
		print "Looking at ", self.path
		print self.client_address
		#/on0
		#/off0
		#/toggle0
		print self.path[1:4]
		if (self.path[1:3] == "on"):
			try:
				if (self.path[3] == "0"):
					relay.turnOn(0)
				else:
					relay.turnOn(1)
			except:
				relay.turnOn(0)
				relay.turnOn(1)
		elif (self.path[1:4] == "off"):
			try:
				print self.path[4]
				if (self.path[4] == "0"):
					relay.turnOff(0)
				elif (self.path[4] == "1"):
					relay.turnOff(1)
			except:
				relay.turnOff(0)
				relay.turnOff(1)
		elif (self.path[1:8] == "toggle_"):
			try:
				if (self.path[7] == "0"):
					relay.toggle(0)
				elif (self.path[7] == "1"):
					relay.toggle(1)
			except:
				relay.toggle(0)
				relay.toggle(1)
		else:
			print "idunno"
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
