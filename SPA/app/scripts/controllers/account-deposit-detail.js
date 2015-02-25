'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
 angular.module('spaApp').controller('AccountDepositDetailCtrl', ['$scope', '$location','$rootScope', 'accountsProvider', function ($scope, $location, $rootScope,accountsProvider) {

	var params = {};
	params.numPage = 0;
	params.size = 100;

  $scope.searchParams = {};

	accountsProvider.getAccountDetail($scope.selectedAcccountId).then(
		function(data) {
			$scope.accountDetail = $rootScope.accountDetail;
		});

	accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
		function(data){
			$scope.accountTransactions = $rootScope.transactions;
		});

	$scope.getTransactions = function(date_start, date_end){
		params.date_end = date_end;
		params.date_start = date_start;
		accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
			function(data){
				$scope.accountTransactions = $rootScope.transactions;
		});

	}

  $scope.search = function() {
    if($scope.searchParams.date_start && $scope.searchParams.date_end) {
      $scope.getTransactions($scope.searchParams.date_start, $scope.searchParams.date_end);
    } else if($scope.searchParams.date_start === null && $scope.searchParams.date_end === null) {
      params.date_end = null;
      params.date_start = null;
      accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
          function(data){
            $scope.investmentTransactions = $rootScope.transactions;
          });

    }
  };

}]);
