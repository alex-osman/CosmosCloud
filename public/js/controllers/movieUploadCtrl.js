angular
	.module("cosmosCloud")
	.controller("movieUploadCtrl", ["$scope", '$http', 'FileUploader', function($scope, $http, FileUploader) {
		$scope.message = "movieUploadCtrl"
		$scope.uploader = new FileUploader({
			url: '/uploadFile'
		});
	}])