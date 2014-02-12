'use strict';

angular.module('spaApp').controller('TransactionsCtrl', function($scope, $http, $location, $stateParams) {
	$http({
		url: 'http://abanking-ext-api.herokuapp.com/api/accounts/' + $stateParams.account_id + '/transactions',
		method: 'GET'
	}).
	success(function(data, status, headers) {
		$scope.account = data.account;
		$scope.transactions = data.transactions;
		console.log($scope.transactions);
	}).
	error(function(data, status) {
		console.log(data, status);
		$location.path( '/login' );
	});
});