angular
	.module("cosmosCloud")
	.controller("pictureCtrl", ["$scope", "$http", '$route', '$location', function($scope, $http, $route, $location) {
		$scope.message = "Picture Controller!";
		$http.get('/api/pictures').success(function(data){
			$scope.pictures = data
		});
		$scope.delete = function(picture) {
			$http.post('/del/pictures/' + picture).success(function(data) {
				console.log(data)
				if(data === "ok")
					$route.reload()
				else $scope.hello = "Error: " + data
			})
		}
		$scope.upload = function() {
			$location.path("/pictureUpload")
		}
	}])