'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('TransfersCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'userProvider', 'thirdAccountProvider', function ($rootScope, $scope, $location, $routeParams, accountsProvider, userProvider, thirdAccountProvider) {
	
    $scope.selection = 1;
    $scope.beneficiary = {};
    $scope.payment = {};
    $scope.transfer = {};
    $scope.transfer.date = 'today';
    $scope.theAccounts = [];

	accountsProvider.getAccounts().then(
	   function(data) {
           $rootScope.accounts.forEach(
               function (value, index, ar) {
                   value.group = 'Cuentas Propias';
                   $scope.theAccounts.push( value );
               }
           );
		}
	);
    
    thirdAccountProvider.getThirdAccounts().then(
        function(data) {
            $rootScope.thirdAccounts.forEach(
                function (value, index, ar) {
                    value.group = 'Cuentas Terceros';
                    $scope.theAccounts.push( value );
                }
            );
        }
    );

    /**
     * Function to navigate between steps.
	 */
	 $scope.completeStep = function(nextStep) {
		$scope.selection = nextStep;
	 };

    /**
     * Send transfer to an own account.
     */
    $scope.sendTransfer = function() {
        console.log( 'account: ' + $scope.transfer.account._account_id );
        console.log( 'destination: ' + $scope.transfer.destination._account_id );
        console.log( 'amount: ' + $scope.transfer.amount );
        console.log( 'concept: ' + $scope.transfer.concept );
        accountsProvider.transferOwnAccounts($scope.transfer.account._account_id, $scope.transfer.destination._account_id, 
                                             $scope.transfer.amount, $scope.transfer.concept).then(
            function(data) {
                console.log(data);
            }
        );
        $scope.selection = 6;
    };
    
    /**
     * Send beneficiary data to service.
     */
    $scope.sendBeneficiary = function() {
        // account = 18 digitos (002123456789012347) y token correcto
        thirdAccountProvider.registerThirdAccount($scope.beneficiary.aka, $scope.beneficiary.name,
                                                 $scope.beneficiary.email, $scope.beneficiary.phone,
                                                 $scope.beneficiary.account, $scope.beneficiary.token).then(
            function(data) {
                console.log(data);
            }
        );
    };

    /**
     * Send payment to service.
     */
    $scope.sendPayment = function() {
        if ($scope.payment.amount == 'payment.other')
            $scope.payment.amount = $scope.payment.other;
        
        console.log( $scope.payment );
        accountsProvider.transferOwnAccounts($scope.payment.account._account_id, $scope.payment.destiny._account_id, 
                                             $scope.payment.amount).then(
            function(data) {
                console.log(data);
            }
        );
    };
}]);
