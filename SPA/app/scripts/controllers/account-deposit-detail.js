'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
 angular.module('spaApp').controller('AccountDepositDetailCtrl', ['$scope', '$location','$rootScope', 'accountsProvider', function ($scope, $location, $rootScope,accountsProvider) {

	accountsProvider.getAccountDetail($scope.selectedAcccountId+'-'+$scope.selectedAccountType).then(
		function(data) {
			$scope.accountDetail = $rootScope.accountDetail;
		});

	accountsProvider.getTransactions($scope.selectedAcccountId+'-'+$scope.selectedAccountType, 0, 100).then(
		function(data){
			$scope.accountTransactions = $rootScope.transactions;
		});

}]);
