import RPi.GPIO as GPIO
import time
GPIO.setwarnings(False)

class Gpio:
	modules = []
	pins = []
	def __init__(self):
		GPIO.setmode(GPIO.BCM)

	def addModule(self, module):
		self.modules.append(module)

	def getNumModules(self):
		return len(self.modules)

	def flash17(self):
		print("Flashing 17")
		for x in range(6):
			self.pins[0].turnOn()
			time.sleep(.125)
			self.pins[0].turnOff()
			time.sleep(.125)

class Pin:
	num = 0
	status = False
	def __init__(self, num_):
		GPIO.setup(num_, GPIO.OUT)
		self.num = num_
	def getNum(self):
		return self.num
	def getStatus(self):
		return self.status
	def setStatus(self, on):
		if (on):
			self.turnOff()
		else:
			self.turnOff()
	def turnOn(self):
		GPIO.output(self.num, GPIO.HIGH)
		self.status = False
	def turnOff(self):
		GPIO.output(self.num, GPIO.LOW)
		self.status = True

class Module:
	def __init__(self):
		print("Module Constructor")
class LEDMatrix(Module):
	cathodes = []
	annodes = []

	def __init__(self, pinNums):
		for x in range(3):
			self.cathodes.append(Pin(pinNums[x]))
			self.cathodes[x].turnOn()
			self.annodes.append(Pin(pinNums[x+3]))
	def getPin(self, x):
		if x < 3:
			return self.cathodes[x]
		else:
			return self.annodes[x]
	def flash(self, x, y):
		self.cathodes[x].turnOff()
		self.annodes[y].turnOn()
		time.sleep(.05)
		self.cathodes[x].turnOn()
		self.annodes[y].turnOff()
	def waveUp(self):
		for x in range(3):
			for y in range(3):
				self.flash(x, y)
	def waveRight(self):
		for x in range(3):
			for y in range(3):
				self.flash(y, x)
	def turnOn(self, x, y):
		self.cathodes[x].turnOff()
		self.annodes[y].turnOn()
	def turnOff(self, x, y):
		self.cathodes[x].turnOn()
		self.annodes[y].turnOff()
		


class Relay(Module):
	outlets = []

	def __init__(self, pinNums):
		for x in range(len(pinNums)):
			self.outlets.append(Outlet(Pin(pinNums[x])))
	def __del__(self):
		self.wave()

	def turnOn(self, num):
		self.outlets[num].turnOn()
	def turnOff(self, num):
		self.outlets[num].turnOff()
	def toggle(self, num):
		print "Toggling ", num
		self.outlets[num].toggle()
	def flash(self, num):
		outlet = self.outlets[num]
		outlet.turnOn()
		time.sleep(0.05)
		outlet.turnOff()
		time.sleep(0.05)
	def wave(self):
		for x in range(len(self.outlets)):
			self.flash(x)
	def status(self):
		status = ""
		for x in range(len(self.outlets)):
			status = status + " " +  str(self.outlets[x].getStatus())
		return status

class rgb:
	pins = []
	brightness = [0,0,0];

	def __init__(self, pinNums):
		for x in range(len(pinNums)):
			Pin(pinNums[x]).turnOn
			self.pins.append(GPIO.PWM(pinNums[x], 100))
		self.off()
	def __del__(self):
		self.off()

	def on(self, color):
		if (color == "red"):
			self.brightness[0] = 0
		elif (color == "green"):
			self.brightness[1] = 0
		elif (color == "blue"):
			self.brightness[2] = 0
		elif (color == "white"):
			self.brightness[0] = 0
			self.brightness[1] = 0
			self.brightness[2] = 0
		self.update()

	def off(self):
		self.brightness[0] = 100
		self.brightness[1] = 100
		self.brightness[2] = 100
		self.update()

	def update(self):
		self.pins[0].start(self.brightness[0])
		self.pins[1].start(self.brightness[1])
		self.pins[2].start(self.brightness[2])

	def set(self, bright):
		self.brightness = bright
		self.update()

	def wave(self):
		for x in range(0, 3):
			self.brightness[x] = 0
			self.update()
			time.sleep(0.25)
			self.brightness[x] = 100
			self.update()

	def change(self, bright):
		if (bright[0] < self.brightness[0]):
			for x in range(self.brightness[0], bright[0], -1):
				time.sleep(0.01)
				self.set([x, self.brightness[1], self.brightness[2]])
		else:
			for x in range(self.brightness[0], bright[0]):
				time.sleep(0.01)
				self.set([x, self.brightness[1], self.brightness[2]])
		
		if (bright[1] < self.brightness[1]):
			for x in range(self.brightness[1], bright[1], -1):
				time.sleep(0.01)
				self.set([self.brightness[0], x, self.brightness[2]])
		else:
			for x in range(self.brightness[1], bright[1]):
				time.sleep(0.01)
				self.set([self.brightness[0], x, self.brightness[2]])

		if (bright[2] < self.brightness[2]):
			for x in range(self.brightness[2], bright[2], -1):
				time.sleep(0.01)
				self.set([self.brightness[0], self.brightness[1], x])
		else:
			for x in range(self.brightness[2], bright[2]):
				time.sleep(0.01)
				self.set((self.brightness[0], self.brightness[1], x))
		
class Outlet:
	pin = None
	status = False
	def __init__(self, pin_):
		self.pin = pin_
	def getStatus(self):
		return self.status
	def turnOn(self):
		self.pin.turnOff()
		self.status = True
	def turnOff(self):
		self.pin.turnOn()
		self.status = False
	def toggle(self):
		print("toggling " + str(self.status))
		if(self.status):
			self.turnOff()
		else:
			self.turnOn()

