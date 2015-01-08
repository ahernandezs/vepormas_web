'use strict';

/**
 * The credit card controller.
 */
angular.module('spaApp').controller('creditCardCtrl', ['$scope', '$location', '$stateParams', 'accountsProvider', '$rootScope', function ($scope, $location, $stateParams, accountsProvider, $rootScope) {

	var params = {};
	params.numPage = 0;
	params.size = 100;

    accountsProvider.getAccountDetail($stateParams.accountId+'-TDC').then(
      function(data) {
		$scope.creditsHeader = $rootScope.accountDetail.credit_card;
      }
    );

	accountsProvider.getTransactions($scope.selectedAcccountId+'-'+$scope.selectedAccountType, params).then(
		function(data){
			$scope.creditCardTransactions = $rootScope.transactions;
		}
	);

	$scope.getTransactions = function(date_start, date_end){
		params.date_end = date_end;
		params.date_start = date_start;
		accountsProvider.getTransactions($scope.selectedAcccountId+'-'+$scope.selectedAccountType, params).then(
			function(data){
				$scope.creditCardTransactions = $rootScope.transactions;
		}
	);

}}]);
