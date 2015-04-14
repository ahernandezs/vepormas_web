'use strict';

angular.module('spaApp').controller('AdminCtrl', ['$rootScope', '$scope', 'adminProvider', '$location', 'userProvider', 'thirdAccountProvider', 'codeStatusErrors', function ($rootScope, $scope, adminProvider, $location, userProvider, thirdAccountProvider,codeStatusErrors) {

	//if the user has full access, the default page is the configuration one. otherwise it is the contract-information page
	if(userProvider.isCompleteUser()){
		$scope.adminOpt = 4;
	}else{
		$scope.adminOpt = 5;
	}

	$scope.asktoken = false;

	$scope.selection = 1;
	$scope.action = 1;

    $scope.stage = 1;
    $scope.change = {};
    $scope.stage_password = 1;
    $scope.beneficiary = {};
	$scope.stage_updatecommunication = 'stage1';
	$scope.today = new Date();
	$scope.actionUpdateState = 1;
	$scope.updateDigitalBankServiceState = [];
	$scope.resultChangePass = false;
	loadBeneficiary();

    $scope.updateService = function(action, state){
		$scope.actionUpdateState = action;
		$scope.updateDigitalBankServiceState.state = state;
    }

	$scope.selectBeneficiary = function(account){
		$scope.action = 2;
		$scope.stage = 1;
		$scope.selectedAccount = account;
		$scope.delete.otp='';
	}

	$scope.siguiente = function(){
		$scope.stage += 1;
	}

	$scope.regresar = function(){
		$scope.action = 1;
		$scope.stage = 1;
		$scope.delete.otp='';
	}

	/**
	 * delete a third-account
	 */
	$scope.delete = function(){
		thirdAccountProvider.unregisterThirdAccount($scope.selectedAccount._account_id, $scope.delete.otp).then(
			function(data){
				dispatchThirdAccountByType(data);
				$scope.stage += 1;
				$scope.delete.otp = '';
			},
			function(errorObject) {
				$scope.delete.otp = '';
				var status = errorObject.status;
		        if(status === 403){
					$scope.manageOtpErrorMessage(errorObject.response);
			    } else {
			    	var msg = codeStatusErrors.errorMessage(status);
					if (status === 500){
		            	$scope.setServiceError(msg + errorObject.response.message);
		        	} else {
		        		$scope.setServiceError(msg);
		        	}
			    }
			}
		);
	}

	/**
	 * dispatch the third-account by their type (if they are from Consubanco or not)
	 */
	function dispatchThirdAccountByType(data){
		$scope.third_accounts = data;
		var third_accounts_own = [];
		var third_accounts_others = [];
		if (typeof $scope.third_accounts != 'undefined'){
			$scope.third_accounts.forEach(function(acc){
				if(acc.same_bank){
					third_accounts_own.push(acc);
				}else{
					third_accounts_others.push(acc);
				}
			});
		}
		$scope.third_accounts_own = third_accounts_own;
		$scope.third_accounts_others = third_accounts_others;
	}

	/**
	 * get the third-account when initializing the controller.
	 */
	function loadBeneficiary(){
		thirdAccountProvider.getThirdAccounts().then(
			function(data) {
				dispatchThirdAccountByType(data);
			},function(errorObject) {
				var status = errorObject.status;
		        if(status === 403){
					$scope.manageOtpErrorMessage(errorObject.response);
			    } else {
			    	var msg = codeStatusErrors.errorMessage(status);
					if (status === 500){
		            	$scope.setServiceError(msg + errorObject.response.message);
		        	} else {
		        		$scope.setServiceError(msg);
		        	}
			    }
			}
		)
	};

    /**
     * Evaluates if the new passwords are equals.
     */
    $scope.verifyNewPass = function () {
        if ( $scope.change.new !== $scope.change.repeatNew ){
            $scope.errorMessage = "Las contraseñas no coinciden";
            $scope.showError = true;
        }else{
            $scope.stage_password = 2;
        }
    };

    /**
	 * Validate Email from updateCommunication and goes one step forward.
	 */
	$scope.validateEmail = function () {
		$scope.stage_updatecommunication = 'stage2';
	};

	/**
	 * Reset data
	 */
	$scope.resetUpdateData = function () {
		$scope.$parent.updatedata = {};
		$scope.goBack();
	};


	/**
	 * Go back one step in the updateCommunication flow.
	 */
	$scope.goBack = function () {
		$scope.stage_updatecommunication = 'stage1';
	};

	/**
	 * Update the communication information.
	 */
	$scope.sendCommunication = function () {
		adminProvider.updateCommunication($scope.$parent.updatedata.phone, $scope.$parent.updatedata.e_mail, $scope.$parent.updatedata.otp).then(
			function (data) {
				console.log('Communication data updated successfully');
				$scope.stage_updatecommunication = 'stage3';
			},
			function(errorObject) {
				var status = errorObject.status;
		        if(status === 403){
					$scope.manageOtpErrorMessage(errorObject.response);
			    } else {
			    	var msg = codeStatusErrors.errorMessage(status);
					if (status === 500){
		            	$scope.setServiceError(msg + errorObject.response.message);
		        	} else {
		        		$scope.setServiceError(msg);
		        	}
			    }
			}
		);
	};

    /**
     * Send the new password to the service.
     */
    $scope.modifyPassword = function() {
        adminProvider.updatePassword($scope.change.old, $scope.change.new, $scope.change.otp).then(
        	function(data){
	            console.log('Password modified correctly');
	            $scope.resultChangePass = true;
	        },
	        function(errorObject) {
				$scope.resultChangePass = false;
				var status = errorObject.status;
		        if(status === 403){
					$scope.manageOtpErrorMessage(errorObject.response);
			    } else {
			    	var msg = codeStatusErrors.errorMessage(status);
					if (status === 500){
		            	$scope.setServiceError(msg + errorObject.response.message);
		        	} else {
		        		$scope.setServiceError(msg);
		        	}
			    }
			}
		);
        $scope.stage_password = 3;
    };

    /**
     * return true if user has full accesses
     */
    $scope.isCompleteUser = function(){
        return userProvider.isCompleteUser();
    };


/**********************
Adding a beneficary actions
**********************/

	$scope.addBeneficary = function(){
		$scope.action = 3;
	}

    $scope.completeStep = function(nextStep) {
		$scope.selection = nextStep;
		if (nextStep === 1) {
			$scope.beneficiary = {};
			$scope.payment = {};
			$scope.transfer = {};
		}
	 };

    $scope.validateThirdAccount = function(){
        thirdAccountProvider.validateThirdAccount($scope.beneficiary.account).then(
            function(data) {
                console.log(JSON.stringify(data));
                $scope.beneficiary._account_id = data._account_id;
                $scope.beneficiary.bank_name = data.bank_name;
                $scope.beneficiary.same_bank = data.same_bank;
                if($scope.beneficiary.same_bank){
                    $scope.beneficiary.name = data.client_name;
                }
                $scope.selection = 2;
            },
	        function(errorObject) {
				var status = errorObject.status;
		        var msg = codeStatusErrors.errorMessage(status);
				if (status === 500){
		            $scope.setServiceError(msg + errorObject.response.message);
		        } else if(status === 406){
		        	if(errorObject.response.code){
		        		var validationErrorCode = errorObject.response.code;
		        		switch(validationErrorCode){
		        			case 100 : msg="El Formato es invalido"; break;
		        			case 101 : msg="La CLABE es invalida"; break;
		        			case 102 : msg="El número de tarjeta de credito es invalido"; break;
		        			case 103 : msg="El número de cuenta es invalido"; break;
		        			case 200 : msg="El número de cuenta no está registrado en el sistema"; break;
		        		}
		        	}
		        	$scope.setServiceError(msg);
		    	}else {
		        	$scope.setServiceError(msg);
		        }
			}
        );
    }

    $scope.sendBeneficiary = function() {
        // account = 18 digitos (002123456789012347) y token correcto
        thirdAccountProvider.registerThirdAccount($scope.beneficiary.aka, $scope.beneficiary.name,
                                                 $scope.beneficiary.email, $scope.beneficiary.phone,
                                                 $scope.beneficiary._account_id, $scope.beneficiary.token).then(
            function(data) {
                dispatchThirdAccountByType(data);
                $scope.selection = 4;
            },
	        function(errorObject) {
				var status = errorObject.status;
		        if(status === 403){
					$scope.manageOtpErrorMessage(errorObject.response);
			    } else {
			    	var msg = codeStatusErrors.errorMessage(status);
					if (status === 500){
		            	$scope.setServiceError(msg + errorObject.response.message);
		        	} else {
		        		$scope.setServiceError(msg);
		        	}
			    }
			}
        );
    }

    $scope.updateDigitalBankServiceState = function(){
		adminProvider.updateDigitalBankServiceState($scope.updateDigitalBankServiceState.state, $scope.updateDigitalBankServiceState.otp).then(
			function(data){
				$scope.exception = false;
				$scope.actionUpdateState = 3;
				$scope.updateDigitalBankServiceState.otp = '';
				$scope.message = "La información se actualizó correctamente.";
			},
			function(errorObject){
				$scope.exception = true;
				$scope.actionUpdateState = 3;
				$scope.updateDigitalBankServiceState.otp = '';
		        var status = errorObject.status;
		        if(status === 403){
					$scope.manageOtpErrorMessage(errorObject.response);
			    } else {
			    	var msg = codeStatusErrors.errorMessage(status);
					if (status === 500){
		            	$scope.setServiceError(msg + errorObject.response.message);
		        	} else {
		        		$scope.setServiceError(msg);
		        	}
			    }			    
			}
		);
    }

	adminProvider.getLimits().then(
		function(){
			$scope.limits = $rootScope.limits;
		}
	);

	$scope.setLimits = function(amount, type, otp){
		adminProvider.setLimits(amount, type, otp).then(
			function(data){
				adminProvider.getLimits().then(
					function(){
						$scope.limits = $rootScope.limits;
					}
				);

			},
			function(errorObject){
	            $scope.setServiceError(errorObject);
				adminProvider.getLimits().then(
					function(){
						$scope.limits = $rootScope.limits;
					}
				);
			}
		);
	}

  adminProvider.getUserActivity().then(
    function(data) {
      console.log(data);
      $scope.userActivity = data.user_activity;
    }
  );

  $scope.mapUserActivity = function(activity) {
    var activityName = activity;

    var userActions = {
      'checkLogin': 'Pre Login',
      'authenticateUser': 'Login',
      'logout': 'Logout',
      'getAccounts': 'Consulta de Cuentas',
      'setAccountsLimits': 'Modificación de Límites',
      'getFile': 'Consulta de Estado de Cuenta',
      'getInvestmentProductsForUser': 'Consulta de Inversiones',
      'getThirdAccounts': 'Consulta de Cuentas de Terceros',
      'saveThirdAccount': 'Alta de Beneficiario',
      'removeThirdAccount': 'Baja de Beneficiario',
      'activateSecurityToken': 'Activación de Token',
      'disableSecurityToken': 'Baja de Token',
      'synchronizeSecurityToken': 'Sincronización de Token',
      'transfer': 'Transferencia',
      'changePassword': 'Cambio de Password',
      'updateCommunicationInfo': 'Cambio de Medio de Comunicación',
      'updateDigitalBankServicesState': 'Cambio de Status en Banca Digital'
    };

    if(userActions[activity]) {
      activityName = userActions[activity];
    }

    return activityName;
  };

  $scope.mapActivityStatus = function(activityStatus) {
    var statuses = {
      true : 'exitoso',
      false: 'fallo'
    };

    return statuses[activityStatus];
  };
}]);
