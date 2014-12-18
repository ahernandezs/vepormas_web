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

	$scope.accounts = [{ accountId:'001', name:'Consutarjeta Naranja1', lastDigits:'*********12345', totalAmount:'50000',type:1},
					   { accountId:'002', name:'Consutarjeta Naranja2', lastDigits:'*********12346', totalAmount:'60000',type:1},
					   { accountId:'003', name:'Consutarjeta Naranja3', lastDigits:'*********12314', totalAmount:'70000',type:1},
					   { accountId:'004', name:'Consuinversión', lastDigits:'Vista', totalAmount:'50000',type:2},
					   { accountId:'005', name:'Consuinversión', lastDigits:'CEDE', totalAmount:'60000',type:2},
					   { accountId:'006', name:'Consupagaré', lastDigits:'', totalAmount:'70000',type:2},
					   { accountId:'008', name:'Cuenta1', lastDigits:'*********12345', totalAmount:'70000',type:3},
					   { accountId:'007', name:'Cuenta2', lastDigits:'*********12345', totalAmount:'70000',type:3},
					   { accountId:'009', name:'Crédito Institucional', lastDigits:'', totalAmount:'70000',type:4},
					   { accountId:'010', name:'Crédito Institucional', lastDigits:'', totalAmount:'70000',type:4},
					   ];

    //accountsProvider.getTransactions($routeParams.accountId,$scope.numPage,10).then(
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
        case 1:
            console.log('Tarjeta de Credito');
            $location.path('/accounts/credit/'+accountId);
            break;
        case 2:
            console.log('Inversiones');
            $location.path('/accounts/investment/'+accountId);
            break;
        case 3:
            console.log('Cuentas');
            $scope.loadAccountsHeader(accountId);
            break;
        case 4:
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
        console.log('here');
        $scope.accountHeader = {
                       'availableMoney' : '7,000.00',
                       'startDate' : '21 / ABR / 2014',
                       'creditAmount' : '40,000.00',
                       'appliedPayments' : '20',
                       'discountAmount' : '1,500.00',
                       'paymentCycle' : 'Mensual',
                       'overdueAmount' : '0.00',
                       'nextPaymentAmount' : '200.00',
                       'nextPaymentDate' : '15 / OCT / 2014',
                       'daysOverdue' : '0',
                       'dependence' : 'Empresa'
        };
    };

  $scope.selectAccount('001',1);
}]);
