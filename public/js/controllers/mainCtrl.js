angular
	.module("cosmosCloud", ['ngRoute', 'angularFileUpload', 'ngSanitize'])
	.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function($routeProvider, $locationProvider, $sceDelegateProvider) {
		$sceDelegateProvider.resourceUrlWhitelist(['self']);

		$routeProvider
			.when('/home', {
				templateUrl: '/html/home.html'
			})
			.when('/movies', {
				templateUrl: '/html/movies.html'
			})
			.when('/pictures', {
				templateUrl: '/html/pictures.html'
			})
			.when('/docs', {
				templateUrl: '/html/doc.html'
			})
			.when('/pictureUpload', {
				templateUrl: '/html/pictureUpload.html'
			})
			.when('/movieUpload', {
				templateUrl: '/html/movieUpload.html'
			})
			.when('/docUpload', {
				templateUrl: '/html/docUpload.html'
			})
			.when('/ledger', {
				templateUrl: '/html/ledger.html'
			})
			.otherwise({ redirectTo: '/home'});
	}])
	.filter('bytes', function() {
		return function(bytes, precision) {
			if (bytes == 0 || isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
			if (typeof precision === 'undefined') precision = 1;
			var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
				number = Math.floor(Math.log(bytes) / Math.log(1024));
			return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
		}
	})
	.controller("mainCtrl", ['$scope', '$http', '$location', function($scope, $http, $location) {
		$scope.isActive = function(viewLocation) {
			var active = (viewLocation === $location.path());
			return active;
		};
		$scope.movieUploadPage = function() {
			$location.path("/movieUpload")
		}
		$scope.moviePage = function() {
			$location.path("/movies")
		}
		$scope.homePage = function() {
			$location.path("/home")
		}
	}]);
