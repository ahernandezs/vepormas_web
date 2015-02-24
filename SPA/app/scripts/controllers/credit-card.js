'use strict';

/**
 * The credit card controller.
 */
angular.module('spaApp').controller('creditCardCtrl', ['$scope', '$location', '$stateParams', 'accountsProvider', '$rootScope', function ($scope, $location, $stateParams, accountsProvider, $rootScope) {

	var params = {};
	params.numPage = 0;
	params.size = 100;
	$scope.showStatement = false;
  $scope.previousPeriod = false;

	$scope.getStatements = function(){
		$scope.showStatement = true;

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

    $scope.statements = {}; //traer esto eventualmente del back

	};

	$scope.back = function(){
		$scope.showStatement = false;
	};

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

  $scope.getTransactions = function(previousPeriod){
    if($scope.previousPeriod !== previousPeriod) {
      $scope.previousPeriod = previousPeriod;
      params.previousPeriod = previousPeriod;
      accountsProvider.getTransactions($scope.selectedAcccountId+'-'+$scope.selectedAccountType, params).then(
          function(data){
            $scope.creditCardTransactions = $rootScope.transactions;
          }
      );
    }
  };

}]);
