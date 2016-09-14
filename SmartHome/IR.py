import lirc
sockid = lirc.init("Remote")
import urllib2
while 1:
	code = lirc.nextcode()
	if len(code) < 1:
		print("Unknown")
	elif code[0] == 'power':
		print(urllib2.urlopen("http://127.0.0.1:8080/toggle").read())
	else:
		print(code)
