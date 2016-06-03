angular
	.module("cosmosCloud")
	.controller("remoteCtrl", ["$scope", "$http","$route", "$filter", function($scope, $http, $route, $filter) {

		$http.get('/api/sql/movies').success(function(data){
			$scope.movies = data
		});
		
		$http.get('/api/music').success(function(data) {
			console.log(data)
			$scope.songs = data
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
	
		$scope.playSong = function(url) {
			$http.get('/api/remote/music/' + url).success(function(data) {
				console.log(data);
			})
		}
	}])
