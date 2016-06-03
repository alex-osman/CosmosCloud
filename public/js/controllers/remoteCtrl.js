angular
	.module("cosmosCloud")
	.controller("remoteCtrl", ["$scope", "$http","$route", "$filter", function($scope, $http, $route, $filter) {

		$scope.streams = [
			{
				title: 'NASA',
				img: 'http://thewashingtonstandard.com/wp-content/uploads/2016/02/nasa-logo.jpg',
				height: "160",
				width: "90",
				url: "'http://nasatv-lh.akamaihd.net/i/NASA_101@319270/index_400_av-p.m3u8?sd=10&rebase=on'"
			}
		];

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

		$scope.playStream = function(url) {
			$http.get('/api/remote/stream/' + url).success(function(data) {
				console.log(data);
			})
		}
	}])
