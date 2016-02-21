angular
	.module("cosmosCloud")
	.controller("docUploadCtrl", ["$scope", '$http', 'FileUploader', function($scope, $http, FileUploader) {
		$scope.message = "docUploadCtrl"
		$scope.uploader = new FileUploader({
			url: '/uploadDoc'
		});
	}])