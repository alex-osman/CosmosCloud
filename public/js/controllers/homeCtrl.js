angular
	.module("cosmosCloud")
	.controller("homeCtrl", ["$scope", "$http", function($scope, $http) {
		$http.get('/SQL').success(function(data){
			$scope.sql = data
		});
	}])