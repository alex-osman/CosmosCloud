angular
	.module("cosmosCloud")
	.controller("homeCtrl", ["$scope", "$http", function($scope, $http) {
		$scope.modules = ['relay', 'rgb', 'theatre']
		$scope.nodes = [];
		$scope.newNodes = [];





		//Adds newNode to the database
		$scope.configureNode = function(node) {
			console.log(node);
			$http.post('/api/configureNode', {node: node})
			.success(function(data) {
				console.log(data);
				$scope.newNodes.splice($scope.newNodes.indexOf(node), 1);
				$scope.nodes.push(node);
			})
		}



		//Sets the value of $scope.nodes to all nodes
		var getNodes = function() {
			$http.get('/api/getNodes')
			.success(function(data) {
				console.log(data);
				data.forEach(function(node) {
					if (node.modules) {
						$scope.nodes.push(node);
					} else $scope.newNodes.push(node);
				}) 
			})
		}
		getNodes();
	}])