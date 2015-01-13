'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
 angular.module('spaApp').controller('AccountsCtrl', ['$rootScope', '$scope', '$location', 'accountsProvider', function ( $rootScope, $scope, $location, accountsProvider) {
	//TODO: temporal binding
	console.log('Load account dashboard information');
	  accountsProvider.getAccounts().then(
      function(data) {
      $scope.accounts = $rootScope.accounts;
      $scope.selectNavigatOption('products'); 
      $scope.selectAccount( $scope.accounts[0]);
      console.log($scope.accounts);
      }
    );


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
            $location.path('accounts/'+accountId+'/tdc');//+accountId);
            console.log($location.path());
            break;
        case 'INV':
            console.log('Inversiones');
            $location.path('/accounts/'+accountId+'/investment');
            console.log($location.path());
            break;
        case 'DEP':
            console.log('Cuentas');
            $location.path('/accounts/'+accountId+'/deposit');
            console.log($location.path());
            break;
        case 'CXN':
            console.log('Creditos');
            $location.path('/accounts/'+accountId+'/credit');
            console.log($location.path());
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
