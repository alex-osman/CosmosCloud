angular
	.module("cosmosCloud")
	.controller("docCtrl", ["$scope", "$http", '$route', '$location', function($scope, $http, $route, $location) {
		$scope.message = "Document Controller!";
		$http.get('/api/docs').success(function(data){
			$scope.docs = data
		});
		$scope.delete = function(doc) {
			$http.post('/del/docs/' + doc).success(function(data) {
				console.log(data)
				if(data === "ok")
					$route.reload()
				else $scope.hello = "Error: " + data
			})
		}
		$scope.upload = function() {
			$location.path("/docUpload")
		}
	}])