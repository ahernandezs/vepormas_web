'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('AccountsCtrl', function ($scope,$http,$location) {
	$http({
		url: '/Abanking-Core/accounts',
		method: 'GET'
	}).
	success(function(data, status, headers) {
		$scope.accounts = data.accounts;
	}).
	error(function(data, status) {
		console.log(data, status);
		$location.path( '/login' );
	});
});