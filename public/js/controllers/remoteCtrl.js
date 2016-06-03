angular
	.module("cosmosCloud")
	.controller("remoteCtrl", ["$scope", "$http","$route", function($scope, $http, $route) {

		$http.get('/api/sql/movies').success(function(data){
			$scope.movies = data
		});

		$scope.sendCommand = function(command) {
			console.log(command)
			$http.get('/api/remote/' + command).success(function(data) {
				console.log(data);
			})
		}

		$scope.play = function(url) {
			$http.get('/api/remote/open/' + url).success(function(data) {
				console.log(data);
			})
		}
	}])
