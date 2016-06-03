angular
	.module("cosmosCloud")
	.controller("movieUploadCtrl", ["$scope", '$http', 'FileUploader', function($scope, $http, FileUploader) {
		$scope.message = "movieUploadCtrl"
		$scope.toSQL = [];
		
		$scope.makeImg = function(item, type) {
			console.log(item)
			$http.get("http://api.themoviedb.org/3/search/" + type + "?query=" + item.title + "&api_key=ff0dc479ddf1cdc3775b8c4668f45a53").success(function(data) {
				console.log(data)
				if (data.results.length < 1)
					item.imgUrl = "http://errorlogz.com/wp-content/uploads/2015/12/error.png"
				else {
					var img = data.results[0].poster_path;
					item.imgUrl = "http://image.tmdb.org/t/p/w500" + img
				}
				console.log(item)
			})
		}


		$scope.uploader = new FileUploader({
			url: '/uploadMovie',
			onAfterAddingFile: function(item) {
				item.file.name.replace(/ /g, "_");
				item.title = item.file.name.replace(/_/g, " ");
			},
			onSuccessItem: function(item) {
				var sqlEntry = {};

				sqlEntry.title = item.title
				sqlEntry.url = item.file.name
				sqlEntry.img = item.imgUrl
				console.log(sqlEntry)
				
				$http.post("/SQL/insert/movie", sqlEntry).success(function(data) {
					console.log(data)
				})
			}
		});
	}])


	/**
	 *	The name should be in some new variable and the filename should be item.file.name
	 *
	 */
