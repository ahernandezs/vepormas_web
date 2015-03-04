'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('TransfersCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'userProvider', 'thirdAccountProvider', 'transferProvider', '$controller', function ($rootScope, $scope, $location, $routeParams, accountsProvider, userProvider, thirdAccountProvider, transferProvider, $controller) {

	$scope.section = 'PAY';
    $scope.selection = 1;
    $scope.beneficiary = {};
    $scope.payment = {};
    $scope.transfer = {};
    $scope.theAccounts = [];
    $scope.today = new Date();

    /**
     * Function to navigate between steps.
	 */
    $scope.completeStep = function(nextStep) {
		$scope.selection = nextStep;
		if (nextStep === 1) {
			$scope.beneficiary = {};
			$scope.payment = {};
			$scope.transfer = {};
		}
	 };

	/**
	 * Receive the section value from the UI and change the selection to 1.
	 */
	$scope.change = function(newSection) {
		$scope.section = newSection;
		$scope.selection = 1;
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
        if ( $scope.payment.destiny.account_type == 'TDC' )
            accountsProvider.getAccountDetail($scope.payment.destiny._account_id).then(
                function (data) {
                    $scope.transferAccountDetail = $rootScope.accountDetail.credit_card;
                    delete $rootScope.accountDetail;
                }
            );
    };

    /**
     * Send transfer to own account.
     */
    $scope.sendTransfer = function() {
        resetError();
        if ( $scope.transfer.destiny.account_type == 'DEP' )
            transferOwnAccount();
        else if ( $scope.transfer.destiny.account_type == 'DEB_T' && $scope.transfer.destiny.same_bank )
            transferThirdAccount();
        else if ( !$scope.transfer.destiny.same_bank )
            transferThirdOtherAccount();
    };

    /**
     * Send the transfer to an own account (from CSB to CSB).
     */
    var transferOwnAccount = function() {
        transferProvider.transferToOwnAccount($scope.transfer.account._account_id, $scope.transfer.destiny._account_id,
                                             $scope.transfer.amount, $scope.transfer.concept).then(
            function(data) {
                console.log(data);
                $scope.transferId = data._transaction_id;
                $scope.selection = 3;
            },
            function(data) {
                console.log(data);
                var status = data.status;
                if (status === 401 || status === 423) {
                    // session expired : returned to login
                    setError('session expired: TODO: go to login');
                    //var loginController = $controller('LoginCtrl');
                    //loginController.setError('your session has expired');
                    //$location.path('/login');

                } else if (status === 406 || status === 417) {
                    setError('invalid input: TODO: analyse the code inside the json mesage body');
                    // invalid data input
                } else if (status === 500 || status === 503 || status === 504) {
                    // business or technical exception
                    setError('unknown problem. Please retry later');
                }
            }
        );
    };

    /**
     * Send the transfer to a third party account of CSB.
     */
    var transferThirdAccount = function() {
        transferProvider.transferThirdAccountSameBank($scope.transfer.account._account_id,
                                                     $scope.transfer.destiny._account_id,
                                                     $scope.transfer.amount, $scope.transfer.concept,
                                                     $scope.transfer.otp).then(
            function(data) {
                console.log(data);
                $scope.transferId = data._transaction_id;
                $scope.selection = 3;
            },
            function(data) {
                console.log(data);
                var status = data.status;
                if (status === 401 || status === 423) {
                    // session expired : returned to login
                    setError('session expired: TODO: go to login');
                    //var loginController = $controller('LoginCtrl');
                    //loginController.setError('your session has expired');
                    //$location.path('/login');

                } else if (status === 406 || status === 417) {
                    setError('invalid input: TODO: analyse the code inside the json mesage body');
                    // invalid data input
                } else if (status === 500 || status === 503 || status === 504) {
                    // business or technical exception
                    setError('unknown problem. Please retry later');
                }
            }
        );
    };

    /**
     * Send the transfer to a third party account from another bank.
     */
    var transferThirdOtherAccount = function() {
        transferProvider.transferThirdAccountOtherBank($scope.transfer.account._account_id,
                                                       $scope.transfer.destiny._account_id,
                                                       $scope.transfer.amount, $scope.transfer.concept,
                                                       $scope.transfer.otp, $scope.transfer.reference,
                                                       $scope.transfer.date).then(
            function(data) {
                console.log(data);
                $scope.transferId = data._transaction_id;
                $scope.selection = 3;
            },
            function(data) {
                console.log(data);
                var status = data.status;
                if (status === 401 || status === 423) {
                    // session expired : returned to login
                    setError('session expired: TODO: go to login');
                    //var loginController = $controller('LoginCtrl');
                    //loginController.setError('your session has expired');
                    //$location.path('/login');

                } else if(status === 406 || status === 417) {
                    setError('invalid input: TODO: analyse the code inside the json mesage body');
                    // invalid data input
                } else if(status === 500 || status === 503 || status === 504) {
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
                $scope.selection = 3;
            }
        );
    };

    /**
     * Send payment to service.
     */
    $scope.sendPayment = function() {
        if ($scope.payment.amount == 'payment.other')
            $scope.payment.amount = $scope.payment.other;

        transferProvider.payOwnCard($scope.payment.account._account_id,
                                    $scope.payment.destiny._account_id,
                                    $scope.payment.amount).then(
            function(data) {
                console.log(data);
                $scope.selection = 3;
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

    /**
     * return true if user has full accesses
     */
    $scope.isCompleteUser = function(){
        return userProvider.isCompleteUser();
    }

}]);
