angular
	.module("cosmosCloud")
	.controller("remoteCtrl", ["$scope", "$http","$route", function($scope, $http, $route) {
		console.log("Remote!");
		$scope.sendCommand = function(command) {
			console.log(command)
			$http.get('/api/remote/' + command).success(function(data) {
				console.log(data);
			})
		}

		$scope.keypress = function(event) {
			console.log(event.keyCode);
			if (event.keyCode == 32 || event.keyCode == 112)
				$scope.sendCommand('p')
		}
	}])