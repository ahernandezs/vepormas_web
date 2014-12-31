'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
 angular.module('spaApp').controller('AccountDepositDetailCtrl', ['$scope', '$location','$rootScope', 'accountsProvider', function ($scope, $location, $rootScope,accountsProvider) {

	var params = {};
	params.numPage = 0;
	params.size = 100;

	accountsProvider.getAccountDetail($scope.selectedAcccountId+'-'+$scope.selectedAccountType).then(
		function(data) {
			$scope.accountDetail = $rootScope.accountDetail;
		});

	accountsProvider.getTransactions($scope.selectedAcccountId+'-'+$scope.selectedAccountType, params).then(
		function(data){
			$scope.accountTransactions = $rootScope.transactions;
		});

	$scope.getTransactions = function(date_start, date_end){
		params.date_end = date_end;
		params.date_start = date_start;
		accountsProvider.getTransactions($scope.selectedAcccountId+'-'+$scope.selectedAccountType, params).then(
			function(data){
				$scope.accountTransactions = $rootScope.transactions;
		});

	}

}]);
