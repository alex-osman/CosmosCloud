angular
	.module("cosmosCloud")
	.controller("movieUploadCtrl", ["$scope", '$http', 'FileUploader', function($scope, $http, FileUploader) {
		$scope.message = "movieUploadCtrl"
		$scope.toSQL = [];
		$scope.uploader = new FileUploader({
			url: '/uploadMovie',
			onAfterAddingAll: function(addedItems) {
				for (var i = 0; i < addedItems.length; i++) {
					var sqlEntry = {};
					sqlEntry.title = prompt("Please enter the title", addedItems[i].file.name);
					
				}
			}
		});
	}])