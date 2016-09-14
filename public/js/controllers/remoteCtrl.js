angular
	.module("cosmosCloud")
	.controller("remoteCtrl", ["$scope", "$http","$route", "$filter", function($scope, $http, $route, $filter) {
		$scope.num = 0;
		$scope.theatres = [];

		//Initialize the page by retreiving all theatres and defaulting to the first
		$scope.initialize = function() {
			//First get array of all theatres, then set the current theatre
			$http.get('/getTheatres').success(function(data) {
				for (var i = 0; i < data.length; i++) {
					$scope.theatres.push({"name": data[i]})
				}
				$scope.theatre = $scope.theatres[0]
			})
			$scope.playInfo($scope.num);

			//Get live streams
			$http.get('/sql/livestreams').success(function(data) {
				$scope.streams = data;
			})

			//Get movies
			$http.get('/sql/movies').success(function(data) {
				$scope.movies = data;
			})
		}


		//Retrieves source, position, and duration for the specified theatre
		$scope.playInfo = function(i) {
			console.log("Getting play info for " + i);
			//Get Asset
			$http.get('/dbus/' + i + '/player/GetSource').success(function(data) {
				$scope.theatres[i].source = data;
			})
			//Get Total Duration
			$http.get('/dbus/' + i + '/prop/Duration').success(function(data) {
				$scope.theatres[i].duration = parseInt(data.split(' ')[1]) / 1000000 / 60;
			})
			//Get Current Position
			$http.get('/dbus/' + i + '/prop/Position').success(function(data) {
				$scope.theatres[i].current = parseInt(data.split(' ')[1]) / 1000000 / 60;
			})
		}

		//Sets the theatre to the current active theatre
		//Called with ng-change from select tag
		$scope.setTheatre = function() {
			$scope.num = $scope.theatres.indexOf($scope.theatre);
			$scope.playInfo($scope.num);
		}


		//Commands from the html remote are sent to the server
		$scope.sendCommand = function(command) {
			$http.get('/dbus/' + $scope.num + '/action/' + command).success(function(data) {
				console.log(data);
			})
		}
		$scope.mute = function(x) {
			var method = "Unmute";
			if (x)
				method = "Mute";
			$http.get('/dbus/' + $scope.num + '/player/' + method).success(function(data) {
				console.log(data);
			})
		}

		$scope.playStream = function(id) {
			$http.get('/play/' + $scope.num + '/' + 'stream/' + id).success(function(data) {
				console.log(data);
			});
		}

		$scope.playMovie = function(url) {
			$http.get('/play/' + $scope.num + '/' + url).success(function(data) {
				console.log(data);
			})
		}


/*

		$http.get('/api/sql/movies').success(function(data){
			$scope.movies = data
		});
		
		$http.get('/api/music').success(function(data) {
			$scope.songs = data
		});



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

	
		$scope.twitchStream = function(channelName) {
			$scope.status = "Loading..."
			var channel = channelName + " ";
			$http.get('/api/remote/twitch/' + channelName).success(function(data) {
				console.log(data);
				$scope.status = "Playing " + channel
			});
		}

		$scope.switchLights = function() {
			$http.get('/smarthome/toggle').success(function(data) {
				console.log(data);
			})
		}*/
	}])
