'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('AccountsCtrl', function ($scope,$http,userInformationService,$location) {
	$http({
		url: '/Abanking-Core/accounts',
		method: 'GET',
		headers: {'X-BANK-TOKEN': '1', 'X-AUTH-TOKEN': userInformationService.getUserSessionId}
	}).
	success(function(data, status, headers) {
		$scope.accounts = data.accounts;
	}).
	error(function(data, status) {
		console.log(data, status);
	});
	$scope.userInformation = userInformationService.getUserInformation();
	$scope.userSessionId = userInformationService.getUserSessionId();
});