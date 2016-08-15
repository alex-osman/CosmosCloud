angular
	.module("cosmosCloud")
	.controller("remoteCtrl", ["$scope", "$http","$route", "$filter", function($scope, $http, $route, $filter) {
		$scope.lights = false;
		$scope.num = 0;
		$scope.initialize = function() {
			//First get array of all theatres, then set the current theatre
			$http.get('/getTheatres').success(function(data) {
				$scope.theatres = data;
			})
			$scope.playInfo();
		}

		$scope.playInfo = function() {
			console.log("Getting play info for " + $scope.num);
			//Get Asset
			$http.get('/dbus/' + $scope.num + '/player/GetSource').success(function(data) {
				$scope.source = data;
			})
			//Get Total Duration
			$http.get('/dbus/' + $scope.num + '/prop/Duration').success(function(data) {
				$scope.duration = parseInt(data.split(' ')[1]) / 1000000 / 60;
			})
			//Get Current Position
			$http.get('/dbus/' + $scope.num + '/prop/Position').success(function(data) {
				$scope.current = parseInt(data.split(' ')[1]) / 1000000 / 60;
			})
		}


		$scope.setTheatre = function() {
			$scope.num = $scope.theatres.indexOf($scope.theatre);
			$scope.playInfo();
		}

		$scope.sendCommand = function(command) {
			$http.get('/dbus/' + $scope.num + '/action/' + command).success(function(data) {
				console.log(data);
			})
		}


















/*
		$scope.streams = [
			{
				title: 'NASA',
				img: 'http://thewashingtonstandard.com/wp-content/uploads/2016/02/nasa-logo.jpg',
				height: "90",
				width: "160",
				url: "http://nasatv-lh.akamaihd.net/i/NASA_101@319270/index_400_av-p.m3u8?sd=10&rebase=on"
			},{
				title: 'Food',
				img: 'http://www.smithfieldfoods.com/images/home/packaged-brands/gwaltney-food.jpg',
				height: "100",
				width: "150",
				url: "http://video-edge-7ea600.mia02.hls.ttvnw.net/hls-8c7420/food_21670088816_464012598/high/index-live.m3u8?token=id=7113512843583797126,bid=21670088816,exp=1465185761,node=video-edge-7ea600-1.mia02.hls.justin.tv,nname=video-edge-7ea600.mia02,fmt=high&sig=6a51d3448c24bda8e7f467e2c43ffffbf100814f"
			},{
				title: 'Earth',
				img: "http://1.bp.blogspot.com/-nPiepW_h_gg/VY8kj7talsI/AAAAAAAAEzI/Al3vW23hHWQ/s1600/sun-and-earth-18505.jpg",
				height: "100",
				width: "160",
				url: "http://iphone-streaming.ustream.tv/uhls/9408562/streams/live/iphone/playlist.m3u8"
			},{
				title: "Penguins",
				img: "https://penguinplacepost.files.wordpress.com/2014/12/104111-penguins-lovers-flying-penguin.jpg",
				height: "100",
				width: "160",
				url: "http://seafl-penguin1.apple.camzonecdn.com/CamzoneStreams/seafl-penguin3/Playlist.m3u8"
			},{
				title: "Aquarium",
				img: "http://2.bp.blogspot.com/-sQo4h7WR78Q/VPFpswvS1JI/AAAAAAAAGg4/2KqU3l_nsAE/s1600/aquarium%25252Bscreensaver.jpg",
				height: "100",
				width: "160",
				url: "http://iphone-streaming.ustream.tv/uhls/14812707/streams/live/iphone/playlist.m3u8"
			}
		];*/


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

		$scope.playStream = function(url) {
			$http.post('/api/remote/stream/', {"url": url}).success(function(data) {
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
