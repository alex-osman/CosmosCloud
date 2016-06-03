angular
	.module("cosmosCloud")
	.controller("remoteCtrl", ["$scope", "$http","$route", "$filter", function($scope, $http, $route, $filter) {

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
				url: "http://video-edge-499cb8.iad02.hls.ttvnw.net/hls129/food_21637037840_462956339/high/index-live.m3u8?token=id=4283276442269322084,bid=21637037840,exp=1465065918,node=video-edge-499cb8-1.iad02.hls.justin.tv,nname=video-edge-499cb8.iad02,fmt=high&sig=040eac0410ba2ee77a512ee8822cfa00c8140800"
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
			$http.post('/api/remote/stream/', {"url": url}).success(function(data) {
				console.log(data);
			})
		}
	}])
