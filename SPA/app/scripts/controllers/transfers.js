'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('TransfersCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'userProvider', 'thirdAccountProvider', 'transferProvider', '$controller', function ($rootScope, $scope, $location, $routeParams, accountsProvider, userProvider, thirdAccountProvider, transferProvider, $controller) {
	
    $scope.selection = 1;
    $scope.beneficiary = {};
    $scope.payment = {};
    $scope.transfer = {};
    $scope.theAccounts = [];
    
    /**
     * Function to navigate between steps.
	 */
	 $scope.completeStep = function(nextStep) {
		$scope.selection = nextStep;
	 };

    /**
     * Get the own accounts.
     */
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
    
    /**
     * Get third party accounts.
     */
    thirdAccountProvider.getThirdAccounts().then(
        function(data) {
            $rootScope.thirdAccounts.forEach(
                function (value, index, ar) {
                    value.group = 'Cuentas Terceros';
                    $scope.theAccounts.push( value );
                }
            );
            console.log( $scope.theAccounts );
        }
    );
    
    /**
     * Get the detail of the selected account.
     */
    $scope.getAccountDetail = function() {
        if ( $scope.transfer.destiny.account_type == 'TDC' )
            console.log( 'GETTING DETAIL FOR: ' + $scope.transfer.destiny._account_id );
    };

    /**
     * Send transfer to own account.
     */
    $scope.sendTransfer = function() {
        resetError();
        transferProvider.transferToOwnAccount($scope.transfer.account._account_id, $scope.transfer.destiny._account_id, 
                                             $scope.transfer.amount, $scope.transfer.concept).then(
            function(data) {
                console.log(data);
                $scope.transferId = data._transaction_id;
                $scope.selection = 6;
            },
            function(data) {
                console.log(data);
                var status = data.status;
                if(status === 401 || status === 423){
                    // session expired : returned to login
                    setError('session expired: TODO: go to login');
                    //var loginController = $controller('LoginCtrl');
                    //loginController.setError('your session has expired');
                    //$location.path('/login');
                    
                }else if(status === 406 || status === 417){
                    setError('invalid input: TODO: analyse the code inside the json mesage body');
                    // invalid data input
                }else if(status === 500 || status === 503 || status === 504){
                    // business or technical exception
                    setError('unknown problem. Please retry later');
                }
            }
        );
        
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
        
        transferProvider.payOwnCard($scope.payment.account._account_id, $scope.payment.destiny._account_id, 
                                             $scope.payment.amount).then(
            function(data) {
                console.log(data);
            }
        );
    };

    /**
     * set an error on the page
     */
    function setError(message){
        $scope.error = true;
        $scope.errorMessage = message;
    }

    /**
     * reset the error state to false
     */
    function resetError(){
        $scope.error = false;
        $scope.errorMessage = null;
    }

}]);
