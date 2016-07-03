angular
	.module("cosmosCloud")
	.controller("controlCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
		$scope.turnOn = function() {
			$http.get('/smarthome/turnOn')
		}

		$scope.turnOff = function() {
			$http.get('/smarthome/turnOff')
		}

		$scope.toggle = function() {
			$http.get('/smarthome/toggle')
		}
	}])