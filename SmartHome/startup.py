#!/usr/bin/python

import subprocess
import re
import shlex
import sys
import os
import urllib2
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer

#Dedicated port
DISCOVERY_PORT = '8000'

#Sends a request to the server
def contactServer(coreserver):
	print(urllib2.urlopen("http://" + coreserver + ":" + DISCOVERY_PORT + "/connect").read())

#Basic handler that will start modules
class myHandler(BaseHTTPRequestHandler):
	#GET Requests
	def do_GET(self):
		self.send_response(200)
		self.send_header('Content-type', 'text/html')
		self.end_headers()

		#Start modules according to the core server's request
		print self.path

		#Respond to core server
		self.wfile.write("Modules started")
		return


#Function to start the server after connection with
#core server has been established
def startServer():
	try:
		#Create web server and define the request handler
		server = HTTPServer(("", int(DISCOVERY_PORT)), myHandler)
		print "Started httpserver on port ", DISCOVERY_PORT
		server.serve_forever()
	except KeyboardInterrupt:
		print "Shutting down..."
		server.socket.close()

#Returns a list of all visible machines
def getHosts():
	try:
		return shlex.split(subprocess.check_output("arp -a | grep -v incomplete | sed 's/^.*(//g' | sed 's/).*//g'", shell=True))
	except:
		print "Error finding Cosmos Cloud"

def netcat(host):
	try:
		return subprocess.check_output("nc -zv -w 2 " + host + " " + DISCOVERY_PORT, stderr=subprocess.STDOUT, shell=True)
	except:
		print "Error testing ", host

### SCRIPT ###

cloudFile = "coreserver"

if os.path.isfile(cloudFile):
	f = open(cloudFile, 'r')
	coreserver = f.read()
	f.close()
	contactServer(coreserver)
else:
	print "Looking for Cloud..."
	#Get list of hosts from `arp` with valid IPs
	hosts = getHosts()
	print hosts

	#Check each host for DISCOVERY_PORT
	for host in hosts:
		try:
			# Netcat the host and check for success
			if netcat(host).find("succeeded!") != -1:
				#TODO: Check that this is not a random server on DISCOVERY_PORT

				print("The Cloud is located at %s" %(host))

				#Write IP to file
				f = open(cloudFile, 'w')
				f.write(host)
				f.close()
				contactServer(coreserver)
		except:
			pass
		else:
			pass
startServer()



### Requires `arp` command and `nc` command


