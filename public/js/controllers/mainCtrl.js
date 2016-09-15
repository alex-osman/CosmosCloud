angular
	.module("cosmosCloud", ['ngRoute', 'angularFileUpload', 'ngSanitize', 'ezfb', 'ngCookies', 'angular.filter'])
	.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', 'ezfbProvider', function($routeProvider, $locationProvider, $sceDelegateProvider, ezfbProvider) {
		$sceDelegateProvider.resourceUrlWhitelist(['self']);

		ezfbProvider.setInitParams({
			appId: '1563639673932807'
		})

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
			.when('/remote', {
				templateUrl: '/html/remote.html'
			})
			.when('/control', {
				templateUrl: '/html/control.html'
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
	.controller("mainCtrl", ['$scope', '$http', '$location', 'ezfb', '$cookies', '$rootScope', function($scope, $http, $location, ezfb, $cookies, $rootScope) {
		$rootScope.user = {};
		updateLoginStatus(updateApiMe);

		$scope.login = function() {
			ezfb.login(function (res) {
				if (res.authResponse) {
					updateLoginStatus(updateApiMe);
				}
			}, {scope: 'email,user_likes,public_profile'});
		};

		$scope.logout = function() {
			ezfb.logout(function() {
				updateLoginStatus(updateApiMe)
			})
		}


		function updateLoginStatus(more) {
			ezfb.getLoginStatus(function(res) {
				$scope.loginStatus = res;
				(more || angular.noop)();
			})
		}

		function updateApiMe() {
			ezfb.api('/me', function(res) {
				$scope.apiMe = res;
				$rootScope.user.name = res.name
				if (res.error)
					$cookies.remove("name");
				else {
					$cookies.put("name", res.name);
				}
			})
		}

		$scope.isActive = function(viewLocation) {
			var active = (viewLocation === $location.path());
			return active;
		};
		$scope.changePage = function(page) {
			$location.path('/' + page);
		}

		$scope.movieUploadPage = function() {
			$location.path("/movieUpload")
		}
		$scope.moviePage = function() {
			$location.path("/movies")
		}
		$scope.homePage = function() {
			$location.path("/home")
		}

		/*SHAIRPORT*/
		$scope.shairport = function() {
			$http.get('10.0.0.90:8081/metadata').success(function(data) {
				console.log(data);
				$scope.artist = data.artist
				$scope.album = data.album
				$scope.title = data.title
			})
		}
		$scope.shairport();

	}]);
