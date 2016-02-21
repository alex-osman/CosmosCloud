angular
	.module("cosmosCloud")
	.controller("pictureUploadCtrl", ["$scope", '$http', 'FileUploader', function($scope, $http, FileUploader) {
		$scope.message = "pictureUploadCtrl"
		$scope.uploader = new FileUploader({
			url: '/uploadPicture'
		});
	}])