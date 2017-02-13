import lirc
sockid = lirc.init("Remote")
import urllib2
import time
while 1:
	code = lirc.nextcode()
	print(code)
	if len(code) < 1:
		print("Unknown")
	elif code[0].encode("ascii") == 'toggle':
		print(urllib2.urlopen("http://127.0.0.1:8080/toggle0").read())
	elif code[0].encode("ascii")  == 'coffee':
		print(urllib2.urlopen("http://127.0.0.1:1337/api/dbus/toggleplay").read())
	elif code[0].encode("ascii") == 'LED':
		print(urllib2.urlopen("http://10.0.0.3:8000/rgb/toggle").read())
	else:
		if code[0] == "toggle0":
			volume = "volumeup"
		else:
			volume = "volumedown"
		print(urllib2.urlopen("http://127.0.0.1:1337/api/dbus/".__add__(volume)).read())
