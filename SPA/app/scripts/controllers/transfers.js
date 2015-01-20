'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('TransfersCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'userProvider', 'thirdAccountProvider', function ($rootScope, $scope, $location, $routeParams, accountsProvider, userProvider, thirdAccountProvider) {
	
    $scope.selection = 1;
    $scope.beneficiary = {};
    $scope.transfer = {};
    $scope.transfer.account;
    $scope.transfer.destination;
    $scope.transfer.amount;
    $scope.transfer.concept;
    $scope.transfer.date = 'today';
    

	accountsProvider.getAccounts().then(
	   function(data) {
           $scope.ownAccounts = $rootScope.accounts;
		}
	);


    /**
     * Function to navigate between steps.
	 */
	 $scope.completeStep = function(nextStep) {
		$scope.selection = nextStep;
	 };

    $scope.sendTransfer = function() {
        var source = $scope.transfer.account._account_id + '-' + $scope.transfer.account.account_type;
        var destination = $scope.transfer.destination._account_id + '-' + $scope.transfer.destination.account_type;
        accountsProvider.transferOwnAccounts(source, destination, 
                                             $scope.transfer.amount, $scope.transfer.concept).then(
            function(data) {
                console.log(data);
            }
        );
    };
    
    $scope.sendBeneficiary = function() {
        // account = 18 digitos (002123456789012347) y token correcto
        thirdAccountProvider.registerThirdAccount($scope.beneficiary.aka, $scope.beneficiary.name,
                                                 $scope.beneficiary.email, $scope.beneficiary.phone,
                                                 $scope.beneficiary.account, $scope.beneficiary.token).then(
            function(data) {
                console.log('resultado');
                console.log(data);
            }
        );
    };
     
}]);
