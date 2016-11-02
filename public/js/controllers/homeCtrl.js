angular
	.module("cosmosCloud")
	.controller("homeCtrl", ["$scope", "$http", function($scope, $http) {
		$http.get('/users').success(function(users) {
			var time = new Date().getTime();
			for (var i = 0; i < users.length; i++) {
				var minutes = 25;
				if ((time - users[i].time)/1000/60 < minutes) {
					console.log((time - users[i].time)/1000/60 + " is less than " + minutes + " minutes, " + users[i].Name)
					console.log(users[i].Name)
					users[i].isAlive = true;
				}
			}
			$scope.users = users;
			var alex = users[0];
		})

		$scope.testMovie = function() {
			$scope.data = "Loading...";
			$http.get('/test').success(function(data) {
				$scope.data = data;
			})
		}

		$scope.testStatus = function() {
			$scope.status = "Loading...";
			$http.get('/testStatus').success(function(data) {
				$scope.status = data;
			})
		}

	}])