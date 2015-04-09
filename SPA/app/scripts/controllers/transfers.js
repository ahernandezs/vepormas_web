'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('TransfersCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'userProvider', 'thirdAccountProvider', 'transferProvider', '$controller','paymentCreditCardService', function ($rootScope, $scope, $location, $routeParams, accountsProvider, userProvider, thirdAccountProvider, transferProvider, $controller,paymentCreditCardService) {


	$scope.section = 'PAY';
    $scope.selection = 1;
    $scope.payment = {};
    $scope.payment.select1 = false;
    $scope.payment.select2 = false;
    $scope.payment.select3 = false;
    $scope.transfer = {};
    $scope.theAccounts = [];
    $scope.today = new Date();

	/**
     * Get the own accounts.
     */
	accountsProvider.getAccounts().then(
	   function(data) {
           $rootScope.accounts.forEach(
               function (value, index, ar) {
					if ( value.account_type == 'DEP' || value.account_type == 'TDC' ) {
						value.group = 'Cuentas Propias';
						$scope.theAccounts.push( value );
					}
               }
           );
            if(paymentCreditCardService.accountId){
                var result = $.grep($scope.theAccounts, function(e){ return e._account_id == paymentCreditCardService.accountId });
                $scope.payment.destiny = result[0];
                $scope.payment.destiny.account_type = 'TDC';
                $scope.payment.destiny._account_id = paymentCreditCardService.accountId;
                $scope.getAccountDetail();
                $scope.value = paymentCreditCardService.paymentType;
                if(paymentCreditCardService.paymentType === 'TOTAL_PAYMENT')
                    $scope.payment.other = paymentCreditCardService.amount;
                delete paymentCreditCardService.accountId;
            }
		},
        function(errorObject) {
            var status = errorObject.status;
            if(status === 406){
                $scope.setServiceError('datos inválidos');
            }else if(status === 500){
                var message = errorObject.response.message;
                $scope.setServiceError(message);
            }else{
                $scope.setServiceError('Error en el servicio, intente más tarde');
            }
        }
	);

    /**
     * Get third party accounts.
     */
    thirdAccountProvider.getThirdAccounts().then(
        function(data) {
            data.forEach(
                function (value, index, ar) {
					if ( value.account_type == 'TDC_T' || value.account_type == 'DEB_T' ) {
	                    value.group = 'Cuentas Terceros';
	                    $scope.theAccounts.push( value );
					}
                }
            );
        },
        function(errorObject) {
            var status = errorObject.status;
            if(status === 406){
                $scope.setServiceError('datos inválidos');
            }else if(status === 500){
                var message = errorObject.response.message;
                $scope.setServiceError(message);
            }else{
                $scope.setServiceError('Error en el servicio, intente más tarde');
            }
        }
    );

	/**
	 * Receive the section value from the UI and change the selection to 1.
	 */
	$scope.changeSection = function(newSection) {
		$scope.section = newSection;
		$scope.selection = 1;
	};

    /**
     * Function to navigate between steps. If received a second parameter (true) the objects will be created again.
     */
    $scope.goToStep = function(step, reset) {
        $scope.selection = step;
        if (step === 1) {
           $scope.transfer.otp = '';
     
        if(reset){
            $scope.payment = {};
            $scope.transfer = {};
            }
        }
    };

    /**
     * Get the detail of the selected account (If own account).
     */
    $scope.getAccountDetail = function() {
        if ( $scope.payment.destiny.account_type == 'TDC' )
            accountsProvider.getAccountDetail($scope.payment.destiny._account_id).then(
                function (data) {
                    $scope.transferAccountDetail = $rootScope.accountDetail.credit_card;
                    delete $rootScope.accountDetail;
                },
                function(errorObject) {
                    var status = errorObject.status;
                    if(status === 406){
                        $scope.setServiceError('datos inválidos');
                    }else if(status === 500){
                        var message = errorObject.response.message;
                        $scope.setServiceError(message);
                    }else{
                        $scope.setServiceError('Error en el servicio, intente más tarde');
                    }
                }
            );
    };

	/**
	 * Assign the type of payment selected by the user.
	 */
	$scope.assignValue = function () {
		if ( $scope.payment.type && $scope.payment.type === 'MIN_PAYMENT' )
			$scope.payment.amount = $scope.transferAccountDetail.minimum_payment;
		else if ( $scope.payment.type && $scope.payment.type === 'WIHTOUT_INTEREST_PAYMENT' )
			$scope.payment.amount = $scope.transferAccountDetail.no_interes_payment_due;
		else if ( $scope.payment.type && $scope.payment.type === 'TOTAL_PAYMENT' )
			$scope.payment.amount = $scope.payment.other;

		$scope.selection++;
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
                $scope.transferId = data._transaction_id;
                $scope.selection = 3;
            },
            function(data) {
                var status = data.status;
                if (status === 401 || status === 423) {
                    // session expired : returned to login
                    $scope.setServiceError('session expired: TODO: go to login');
                    //var loginController = $controller('LoginCtrl');
                    //loginController.setError('your session has expired');
                    //$location.path('/login');

                } else if (status === 406 || status === 417) {
                    $scope.setServiceError('invalid input: TODO: analyse the code inside the json mesage body');
                    // invalid data input
                } else if (status === 500){
                    var message = data.response.message;
                    $scope.setServiceError(message);
                } else if (status === 503 || status === 504) {
                    // business or technical exception
                    $scope.setServiceError('unknown problem. Please retry later');
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
                    $scope.setServiceError('session expired: TODO: go to login');
                    //var loginController = $controller('LoginCtrl');
                    //loginController.setError('your session has expired');
                    //$location.path('/login');

                } else if(status === 403){
                    $scope.manageOtpErrorMessage(data.response);
                } else if (status === 406 || status === 417) {
                    $scope.setServiceError('invalid input: TODO: analyse the code inside the json mesage body');
                    // invalid data input
                } else if (status === 500){
                    var message = data.response.message;
                    $scope.setServiceError(message);
                } else if (status === 503 || status === 504) {
                    // business or technical exception
                    $scope.setServiceError('unknown problem. Please retry later');
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
                $scope.transferId = data.tracking_key;
                $scope.selection = 3;
            },
            function(data) {
                console.log(data);
                var status = data.status;
                if (status === 401 || status === 423) {
                    // session expired : returned to login
                    $scope.setServiceError('session expired: TODO: go to login');
                    //var loginController = $controller('LoginCtrl');
                    //loginController.setError('your session has expired');
                    //$location.path('/login');

                } else if(status === 403){
                    $scope.manageOtpErrorMessage(data.response);
                } else if(status === 406 || status === 417) {
                    $scope.setServiceError('invalid input: TODO: analyse the code inside the json mesage body');
                    // invalid data input
                } else if (status === 500){
                    var message = data.response.message;
                    $scope.setServiceError(message);
                } else if (status === 503 || status === 504) {
                    // business or technical exception
                    $scope.setServiceError('unknown problem. Please retry later');
                }
            }
        );
    };

    /**
     * Send payment to service (according to the type of credit card).
     */
    $scope.sendPayment = function() {
        if ( $scope.payment.destiny.account_type == 'TDC' ) {
            payOwnCard();
        } else if ( $scope.payment.destiny.account_type == 'TDC_T') {
            payThirdCard();
        } else {
            $scope.setServiceError('Error de tipo de tarjeta');
        }
    };

    /**
     * pay an own card.
     */
    function payOwnCard(){
        transferProvider.payOwnCard($scope.payment.account._account_id,
                                    $scope.payment.destiny._account_id,
                                    $scope.payment.amount).then(
            function(data) {
				$scope.paymentId = data._transaction_id;
                $scope.selection = 3;
            },
            function(errorObject) {
                var status = errorObject.status;
                if(status === 406){
                    $scope.setServiceError('datos inválidos');
                }else if(status === 500){
                    var message = errorObject.response.message;
                    $scope.setServiceError(message);
                }else{
                    $scope.setServiceError('Error en el servicio, intente más tarde');
                }
            }
        );
    };

    /**
     * pay a third-card
     */
    function payThirdCard(){
        transferProvider.payThirdCard($scope.payment.account._account_id,
                                    $scope.payment.destiny._account_id,
                                    $scope.payment.amount,
                                    null,
                                    $scope.today,
                                    $scope.payment.otp).then(
            function(data) {
				$scope.paymentId = data._transaction_id;
                $scope.selection = 3;
            },
            function(errorObject) {
                var status = errorObject.status;
                if(status === 406){
                    $scope.setServiceError('datos inválidos');
                }else if(status === 500){
                    var message = errorObject.response.message;
                    $scope.setServiceError(message);
                }else if(status === 403){
                    $scope.manageOtpErrorMessage(errorObject.response);
                }else{
                    $scope.setServiceError('Error en el servicio, intente más tarde');
                }
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
