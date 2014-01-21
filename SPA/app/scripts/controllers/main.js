'use strict';

/**
 * login controller
 * inject a login function in the scope
 */
var abankingApp = angular.module('spaApp')
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
});

/**
 *the accounts controller. For now on, only display get the user user information from
 * service and put it in scope
 */
abankingApp.controller('AccountsCtrl', function ($scope,$http,userInformationService,$location) {
	$http({
		url: '/Abanking-Core/accounts',
		method: 'GET',
		headers: {'X-BANK-TOKEN': '1', 'X-AUTH-TOKEN': userInformationService.getUserSessionId}
	}).
	success(function(data, status, headers) {
		$scope.accounts = data.accounts;
		console.log(data);
	}).
	error(function(data, status) {
		console.log(data, status);
	});
	$scope.userInformation = userInformationService.getUserInformation();
	$scope.userSessionId = userInformationService.getUserSessionId();
});

/**
 * the user information service. use to save in global scope the user pieces of information
 */
abankingApp.service('userInformationService', function() {
	var userInformation;
	var userSessionId;

	this.setUserInformation = function(newObj) {
		userInformation=newObj;
	};

	this.getUserInformation = function(){
		return userInformation;
	};

	this.setUserSessionId = function(newObj) {
		userSessionId=newObj;
	};

	this.getUserSessionId = function(){
		return userSessionId;
	};
});
