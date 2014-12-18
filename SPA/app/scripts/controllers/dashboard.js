'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('DashBoardCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', function ($rootScope, $scope, $location, $routeParams, accountsProvider) {
	//TODO: temporal binding
	$scope.completeName = 'ABEL BECERRA CASTRO';
	$scope.date = '17/05/2014';
	$scope.time = '23:34:54';

	$scope.showAccountHeader = true;

	$scope.accountHeader = {'cutDate':'29/Oct/2014',
							'minimumPayment':'760.00',
							'totalPayment':'2,123.00',
							'limitDate':'15/Oct/2014',
							'limitPayment':'760.00',
							'cutBalance':'2,123.00',
							'currentBalance':'2,123.00',
							'noInterest':'1,520.00',
							'dueCurrent':'0.00',
							'limitCredit':'5,000.00',
							'availableCredit':'3,000.00'};

    accountsProvider.getAccounts().then(
      function(data) {
      $scope.accounts = $rootScope.accounts;
      console.log($scope.accounts);
      }
    );
    accountsProvider.getTransactions("89123456789213450-INV",0,100).then(
      function(data) {
			$scope.transactions = $rootScope.transactions;
			console.log($scope.transactions);
      }
    );

  /**
    Function for logout application
  **/
  $scope.logout = function() {
	 $location.path('login');
  };

  $scope.selectAccount = function(accountId, type) {
    $scope.activeClass = accountId;
    console.log(accountId);
    
    switch (type) {
        case 'TDC':
            console.log('Tarjeta de Credito');
            $location.path('/accounts/credit/'+accountId);
            break;
        case 'INV':
            console.log('Inversiones');
            $location.path('/accounts/investment/'+accountId);
            break;
        case 'DEP':
            console.log('Cuentas');
            $scope.loadAccountsHeader(accountId);
            break;
        case 'CXN':
            console.log('Creditos');
            $scope.loadCreditsHeader(accountId);
            break;
        default:
            break;
    }
  };
                       
    $scope.loadAccountsHeader = function(accountId) {
        console.log('here');
        $scope.accountHeader = {
                       'availableMoney' : '7,000.00',
                       'period' : '12 / 09 / 2014 al 12 / 10 / 2014',
                       'funds' : '10,000.00',
                       'fundsGood' : '5,000.00',
                       'totalFunds' : '15,000.00'
        };
    };

    $scope.loadCreditsHeader = function(accountId) {
        //TODO get it from middle
        $scope.creditsHeader =  {
          "cycle_date": 1391580000000,
          "payment_due_date": 1399611600000,
          "credit_limit": 55000,
          "statement_balance": 834.55,
          "no_interes_payment_due": 345.77,
          "current_balance": 123.55,
          "cycle_day": 11,
          "minimum_payment": 456,
          "delinquent_balance": 28345.99,
          "available_credit": 45000
       }
    };

    $scope.creditsHeader =  {
      "cycle_date": 1391580000000,
      "payment_due_date": 1399611600000,
      "credit_limit": 55000,
      "statement_balance": 834.55,
      "no_interes_payment_due": 345.77,
      "current_balance": 123.55,
      "cycle_day": 11,
      "minimum_payment": 456,
      "delinquent_balance": 28345.99,
      "available_credit": 45000
   }

  $scope.selectAccount( $scope.accounts[0]._account_id, $scope.accounts[0].account_type);
}]);
