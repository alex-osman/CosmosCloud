angular
	.module("cosmosCloud")
	.controller("homeCtrl", ["$scope", "$http", function($scope, $http) {
<<<<<<< HEAD
		$http.get('http://api.wunderground.com/api/8f3ad647b3101ad1/conditions/q/PA/Philadelphia.json').success(function (data) {
			var weather = data.current_observation;
			$scope.time = weather.observation_epoch;
			$scope.weather = weather.weather;
			$scope.temp = weather.temp_f
			$scope.icon = "http://icons.wxug.com/i/c/k/partlycloudy.gif"
		})
=======
		// $http.get('/SQL').success(function(data){
		// 	$scope.sql = data
		// });
>>>>>>> 5cad98c967cfe7d741c71c0c66d6e867d1370eeb
	}])