#!/usr/bin/python

import SmartHome
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from os import curdir, sep
from time import time

PORT_NUMBER = 8081

#This handles HTTP Requests
class myHandler(BaseHTTPRequestHandler):
	#GET Requests
	def do_GET(self):
		self.send_response(200)
		self.send_header('Content-type', 'text/html')
		self.end_headers()
		print "Looking at ", self.path
		#print self.client_address
		#/on
		#/oncolor
		#/off
		print self.path[1:4]
		if (self.path[1:3] == "on"):
			try:
				if (self.path[3:6] == "red"):
					rgb.on("red")
				elif (self.path[3:8] == "green"):
					rgb.on("green")
				elif (self.path[3:7] == "blue"):
					rgb.on("blue")
				else:
					rgb.on("white")
			except:
				rgb.on("white")
		elif (self.path[1:4] == "off"):
			try:
				rgb.off()
			except:
				rgb.off()
		else:
			red = self.path[1:3]
			green = self.path[3:5]
			blue = self.path[5:7]
			rgb.change([int(red), int(green), int(blue)])
		self.wfile.write(rgb.brightness)
		return

try:
	#Create web server and define the request handler
	server = HTTPServer(('', PORT_NUMBER), myHandler)
	print 'Started httpserver on port ' , PORT_NUMBER
	gpio = SmartHome.Gpio()
	rgb = SmartHome.rgb([26, 19, 13])	
	server.serve_forever()

except KeyboardInterrupt:
	print '^C received, shutting down the web server'
	server.socket.close()
