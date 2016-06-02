angular
	.module("cosmosCloud")
	.controller("remoteCtrl", ["$scope", "$http","$route", function($scope, $http, $route) {
		console.log("Remote!");
	}])