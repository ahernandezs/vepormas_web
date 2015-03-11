'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('AccountDepositDetailCtrl', ['$scope', '$location','$rootScope', 'accountsProvider', '$stateParams', function ($scope, $location, $rootScope,accountsProvider, $stateParams) {

	var params = {};
	params.numPage = 0;
	params.size = 100;

  	$scope.searchParams = {};

  	//initialize the account-detail
	accountsProvider.getAccountDetail($scope.selectedAcccountId).then(
		function(data) {
			$scope.accountDetail = $rootScope.accountDetail;
		},
		function(data) {
			var message = data.response.message;
			$scope.setServiceError(message);
		}
	);

	//initialize the account's transactions-list
	accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
		function(data){
			$scope.accountTransactions = $rootScope.transactions;
		},
		function(data) {
			var message = data.response.message;
			$scope.setServiceError(message);
		}
	);

	/**
	 * actualize the account transaction-list (search by date)
	 */
	$scope.getTransactions = function(date_start, date_end){
		params.date_end = date_end;
		params.date_start = date_start;
		accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
			function(data){
				$scope.accountTransactions = $rootScope.transactions;
			},
			function(data) {
				var message = data.response.message;
				$scope.setServiceError(message);
			}
		);
	}

	/**
	 * search transactions by date
	 */
	$scope.search = function() {
		if($scope.searchParams.date_start && $scope.searchParams.date_end) {
			$scope.getTransactions($scope.searchParams.date_start, $scope.searchParams.date_end);
		} else if($scope.searchParams.date_start === null && $scope.searchParams.date_end === null) {
			params.date_end = null;
			params.date_start = null;
			accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
			function(data){
				//WTF: why is there 'investment' transactions here?!?
				$scope.investmentTransactions = $rootScope.transactions;
			},
			function(data) {
				var message = data.response.message;
				$scope.setServiceError(message);
			});
		}
	};

	/**
	 * get the statement list
	 */
	$scope.getStatements = function(){
		$scope.showStatement = true;
		accountsProvider.getStates($stateParams.accountId).then(
			function(data) {
				$scope.statements = $rootScope.statements;
			},
			function(data) {
				var message = data.response.message;
				$scope.setServiceError(message);
			}
		);
	};

}]);
