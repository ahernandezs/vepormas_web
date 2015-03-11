'use strict';

/**
 * The credit card controller.
 */
angular.module('spaApp').controller('creditCtrl', ['$scope', '$location', '$stateParams', 'accountsProvider', '$rootScope', '$http', function ($scope, $location, $stateParams, accountsProvider, $rootScope, $http) {

	var params = {};
	params.numPage = 0;
	params.size = 100;
	$scope.years = [
		{ label: '2014', value: 2014 },
		{ label: '2013', value: 2013 },
		{ label: '2012', value: 2012 }
	];
	$scope.months = [
		{ label: 'Enero', value: 1 },
		{ label: 'Febrero', value: 2 },
		{ label: 'Marzo', value: 3 },
		{ label: 'Abril', value: 4 },
		{ label: 'Mayo', value: 5 },
		{ label: 'Junio', value: 6 },
		{ label: 'Julio', value: 7 },
		{ label: 'Agosto', value: 8 },
		{ label: 'Septiembre', value: 9 },
		{ label: 'Octubre', value: 10 },
		{ label: 'Noviembre', value: 11 },
		{ label: 'Diciembre', value: 12 }
	];
	$scope.year = $scope.years[0];

	$scope.searchParams = {};

	accountsProvider.getAccountDetail($scope.selectedAcccountId).then(
		function(data) {
			$scope.creditsHeader = $rootScope.accountDetail;
		});

	accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
		function(data){
			$scope.creditTransactions = $rootScope.transactions;
		});

	$scope.getTransactions = function(date_start, date_end){
		params.date_end = date_end;
		params.date_start = date_start;
		accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
			function(data){
				$scope.creditTransactions = $rootScope.transactions;
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

	$scope.getStatements = function(){
		$scope.showStatement = true;
		accountsProvider.getStates($stateParams.accountId).then(
			function(data) {
				$scope.statements = $rootScope.statements;
			}
		);
	};

	$scope.getStatement = function(id, format){
		$http.get($rootScope.restAPIBaseUrl+'/files/statement?format='+format.toUpperCase()+'&id='+id+'&_account_id='+$stateParams.accountId, {responseType: 'arraybuffer'})
			.success(function (data) {
			var file = new Blob([data], {type: 'application/'+format});
			var fileURL = URL.createObjectURL(file);
			window.open(fileURL);
		});
	}

}]);
