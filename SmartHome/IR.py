import lirc
sockid = lirc.init("Remote")
import urllib2
import time
while 1:
	code = lirc.nextcode()
	print(code)
	if len(code) < 1:
		print("Unknown")
	elif code[0].encode("ascii") == 'power':
		print(urllib2.urlopen("http://127.0.0.1:8080/toggle").read())
	elif code[0].encode("ascii")  == 'coffee':
		print(urllib2.urlopen("http://10.0.0.39:8080/toggle").read())
	elif code[0].encode("ascii") == 'LED':
		print(urllib2.urlopen("http://10.0.0.3:8000/rgb/toggle").read())
	else:
		print(urllib2.urlopen("http://127.0.0.1:8080/".__add__(code[0])).read())
