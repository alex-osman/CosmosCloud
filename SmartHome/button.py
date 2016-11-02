#!/usr/bin/python
import RPi.GPIO as GPIO
import urllib2
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(21, GPIO.IN, pull_up_down=GPIO.PUD_UP)

def my_callback(channel):
	print GPIO.input(21)
	if GPIO.input(21) == False:
		time.sleep(.01)
		print GPIO.input(21)
		if GPIO.input(21) == False:
			print(urllib2.urlopen("http://127.0.0.1:8080/toggle").read())

GPIO.add_event_detect(21, GPIO.FALLING, callback=my_callback, bouncetime=350)

while True:
	continue
