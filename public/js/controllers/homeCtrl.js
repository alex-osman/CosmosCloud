angular
	.module("cosmosCloud")
	.controller("homeCtrl", ["$scope", "$http", function($scope, $http) {

		/*****************************************
			Lists all users active in the last 15 minutes
		*****************************************/
		$http.get('/users').success(function(users) {
			//Get current time
			var time = new Date().getTime();

			var minutes = 25;
			//Mark alive if user has been seen within 25 minutes
			for (var i = 0; i < users.length; i++)
				if ((time - users[i].time)/1000/60 < minutes)
					users[i].isAlive = true;

			$scope.users = users;
		});

		
	}])