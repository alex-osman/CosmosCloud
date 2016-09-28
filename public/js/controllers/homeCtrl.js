angular
	.module("cosmosCloud")
	.controller("homeCtrl", ["$scope", "$http", function($scope, $http) {
		$http.get('http://api.wunderground.com/api/8f3ad647b3101ad1/conditions/q/PA/Philadelphia.json').success(function (data) {
			var weather = data.current_observation;
			$scope.time = weather.observation_epoch;
			$scope.weather = weather.weather;
			$scope.temp = weather.temp_f
			$scope.icon = "http://icons.wxug.com/i/c/k/partlycloudy.gif"
		})
		$http.get('/users').success(function(users) {
			var time = new Date().getTime();
			for (var i = 0; i < users.length; i++) {
				//If it was alive in the past 5 minutes : 300000
				var minutes = 15;
				if (time - users[i].time < (minutes * 60000)) {
					users[i].isAlive = true;
				}
			}
			$scope.users = users;
			//console.log(users);
		})

		$scope.testMovie = function() {
			$scope.data = "Loading...";
			$http.get('/test').success(function(data) {
				$scope.data = data;
			})
		}

		$scope.testStatus = function() {
			$scope.status = "Loading...";
			$http.get('/testStatus').success(function(data) {
				$scope.status = data;
			})
		}

	}])