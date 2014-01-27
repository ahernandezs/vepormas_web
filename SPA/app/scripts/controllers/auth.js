'use strict';

/**
 * login controller
 * inject a login function in the scope
 */
angular.module('spaApp')
  .controller('LoginCtrl', function ($scope,$http,userInformationService,$location) {
	/**
	 * the login function connect the Rest-API: if the response status is OK, redirect to route "accounts",
	 * else put an error message in the scope
	 */
	$scope.login=function(){
		$http({
			url: '/Abanking-Core/users/login',
			method: 'POST',
			data: JSON.stringify({'username':$scope.username, 'password':$scope.password,'access_media': 'SPA'}),
			headers: {'Content-Type': 'application/json','X-BANK-TOKEN': '1'}
		}).
		success(function(data, status, headers) {
			//get the session token from the response and store it in the user service
			userInformationService.setUserSessionId(headers('X-AUTH-TOKEN'));
			//get the user information from the response content
			userInformationService.setUserInformation(data);
			$location.path( '/accounts' );
		}).
        error(function(data, status) {
			//put an error message in the scope
			$scope.errorMessage = 'login failed';
			$scope.status = status;
		});
	};

	$scope.logout = function() {
		$http({
			url: '/Abanking-Core/users/logout',
			method: 'GET',
			headers: {'X-BANK-TOKEN': '1', 'X-AUTH-TOKEN': userInformationService.getUserSessionId}
		}).
		success(function(data, status, headers) {
			//get the session token from the response and store it in the user service
			userInformationService.setUserSessionId(headers('X-AUTH-TOKEN'));
			//get the user information from the response content
			userInformationService.setUserInformation(data);
			$scope.message = 'logout successful';
			$scope.status = status;
			$location.path( '/' );
		}).
        error(function(data, status) {
			//put an error message in the scope
			$scope.errorMessage = 'logout failed';
			$scope.status = status;
		});
	}
});


