'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('AccountsCtrl', ['$scope', '$location', function ($scope, $location) {
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

	$scope.accounts = [{ name:'Consutarjeta Naranja1', lastDigits:'*********12345', totalAmount:'50000',type:1},
					   { name:'Consutarjeta Naranja2', lastDigits:'*********12346', totalAmount:'60000',type:1},
					   { name:'Consutarjeta Naranja3', lastDigits:'*********12314', totalAmount:'70000',type:1},
					   { name:'Consuinversión', lastDigits:'Vista', totalAmount:'50000',type:2},
					   { name:'Consuinversión', lastDigits:'CEDE', totalAmount:'60000',type:2},
					   { name:'Consupagaré', lastDigits:'', totalAmount:'70000',type:2},
					   { name:'Cuenta1', lastDigits:'*********12345', totalAmount:'70000',type:3},
					   { name:'Cuenta2', lastDigits:'*********12345', totalAmount:'70000',type:3},
					   { name:'Crédito Institucional', lastDigits:'', totalAmount:'70000',type:4},
					   { name:'Crédito Institucional', lastDigits:'', totalAmount:'70000',type:4},
					   ];
  /**
    Function for logout application
  **/
  $scope.logout = function() {
	$location.path('/login');
  }

}]);
