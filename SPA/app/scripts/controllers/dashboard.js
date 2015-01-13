'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('DashBoardCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'userProvider', function ($rootScope, $scope, $location, $routeParams, accountsProvider, userProvider) {
	//TODO: temporal binding
	$scope.completeName = $rootScope.client_name;
	$scope.date = $rootScope.last_access_date;

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
      $scope.selectAccount( $scope.accounts[0]);
      console.log($scope.accounts);
      }
    );
  /**
    Function for logout application
  **/
  $scope.logout = function() {
    userProvider.logout().then(
      function(data) {
      console.log('logout: '+data);
      $rootScope.session_token = null;
      $location.path('login');
    });
  };

  $scope.selectAccount = function(accountSelected) {

    var accountId = accountSelected._account_id;
    var type = accountSelected.account_type;

    $scope.activeClass = accountId;
    $scope.selectedAcccountId = accountId;
    $scope.selectedAccountType = type;
    $scope.activeAccountName = accountSelected.name + ' ' + accountSelected.maskedAccountNumber;
    console.log(accountId);
    
    switch (type) {
        case 'TDC':
            console.log('Tarjeta de Credito');
            $location.path('/accounts/creditcard/'+accountId);
            break;
        case 'INV':
            console.log('Inversiones');
            $location.path('/accounts/investment/'+accountId);
            break;
        case 'DEP':
            console.log('Cuentas');
            $location.path('/accounts/deposit/'+accountId);            
            break;
        case 'CXN':
            console.log('Creditos');
            $location.path('/accounts/credit/'+accountId);
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

}]);
