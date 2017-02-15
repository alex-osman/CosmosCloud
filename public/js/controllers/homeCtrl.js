angular
	.module("cosmosCloud")
	.controller("homeCtrl", ["$scope", "$http", function($scope, $http) {
		$scope.modules = [{name: "relay", channels: [{name: "Light"}, {name: "Monitor"}]}, {name: "rgb"}, {name: "theatre"}]
		$scope.nodes = [];
		$scope.newNodes = [];



		//Adds newNode to the database
		$scope.configureNode = function(node) {
			$http.post('/api/configureNode', {node: node})
			.success(function(data) {
				//Remove from newNodes, add to nodes
				$scope.newNodes.splice($scope.newNodes.indexOf(node), 1);
				$scope.nodes.push(node);
			})
		}


		$scope.deleteNode = function(node) {
			$http.post('/api/deleteNode', {node: node})
			.success(function(data) {
				console.log(data);
				$scope.newNodes.splice($scope.newNodes.indexOf(node), 1);
			})
		}

		//Sets the value of $scope.nodes to all nodes
		var getNodes = function() {
			$http.get('/api/getNodes')
			.success(function(data) {
				data.forEach(function(node) {
					console.log(node);
					if (node.modules) {
						$scope.nodes.push(node);
					} else $scope.newNodes.push(node);
				}) 
			})
		}
		getNodes();
	}])