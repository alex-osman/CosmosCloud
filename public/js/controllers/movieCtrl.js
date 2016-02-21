angular
	.module("cosmosCloud")
	.controller("movieCtrl", ["$scope", "$http", '$location', '$sce', '$route', function($scope, $http, $location, $sce, $route) {
		$scope.message = "Movie Controller!";
		$scope.trusted = function(url) {
			return $sce.trustAsResourceUrl(url);
		}

		$http.get('/api/movies').success(function(data){
			$scope.movies = data
		});
		$scope.delete = function(movie) {
			console.log(movie)
			$http.post('/del/Movies/' + movie).success(function(data) {
				console.log(data)
				if(data === "ok")
					$route.reload()
				else $scope.hello = "Error: " + data
			})
		}
		$scope.upload = function() {
			$location.path("/movieUpload")
		}
	}])