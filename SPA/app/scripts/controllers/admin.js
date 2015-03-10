'use strict';

angular.module('spaApp').controller('AdminCtrl', ['$rootScope', '$scope', 'adminProvider', '$location', 'userProvider', 'thirdAccountProvider', function ($rootScope, $scope, adminProvider, $location, userProvider, thirdAccountProvider) {

	//if the user has full access, the default page is the configuration one. otherwise it is the contract-information page
	if(userProvider.isCompleteUser()){
		$scope.adminOpt = 4;
	}else{
		$scope.adminOpt = 5;
	}
	
	$scope.selection = 1;
	$scope.action = 1;
	$scope.data = {otp:''}
    $scope.stage = 1;
    $scope.change = {};
    $scope.stage_password = 1;
    $scope.beneficiary = {};

	$scope.selectBeneficiary = function(account){
		$scope.action = 2;
		$scope.stage = 1;
		$scope.selectedAccount = account;
	}

	$scope.siguiente = function(){
		$scope.stage += 1;
	}

	$scope.regresar = function(){
		$scope.action = 1;
		$scope.stage = 1;
	}

	$scope.delete = function(otp){
		adminProvider.deleteAccount($scope.selectedAccount._account_id, otp).then(function() {
			console.log("Account deleted");
		});
	}

	adminProvider.getThirdAccounts().then(function(data) {
		$scope.third_accounts = $rootScope.third_accounts;
		var third_accounts_own = [];
		var third_accounts_others = [];

		console.log($scope.third_accounts);
		if($scope.third_accounts.length == 0){
			return;
		}

		$scope.third_accounts.forEach(function(acc){
			if(acc.same_bank){
				third_accounts_own.push(acc);
			}else{
				third_accounts_others.push(acc);
			}
		});

		$scope.third_accounts_own = third_accounts_own;
		$scope.third_accounts_others = third_accounts_others;

	});

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
     * Send the new password to the service.
     */
    $scope.modifyPassword = function() {
        adminProvider.updatePassword($scope.change.old, $scope.change.new, $scope.change.otp).then(function(data){
            console.log('Password modified correctly');
        });
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
                console.log(JSON.stringify($rootScope.thirdAccountValidation));
                $scope.beneficiary._account_id = $rootScope.thirdAccountValidation._account_id;
                $scope.beneficiary.bank_name = $rootScope.thirdAccountValidation.bank_name;
                $scope.beneficiary.same_bank = $rootScope.thirdAccountValidation.same_bank;
                if($scope.beneficiary.same_bank){
                    $scope.beneficiary.name = $rootScope.thirdAccountValidation.client_name;
                }
                $scope.selection = 2;
            }
        );
    }

    $scope.sendBeneficiary = function() {
        // account = 18 digitos (002123456789012347) y token correcto
        thirdAccountProvider.registerThirdAccount($scope.beneficiary.aka, $scope.beneficiary.name,
                                                 $scope.beneficiary.email, $scope.beneficiary.phone,
                                                 $scope.beneficiary.account, $scope.beneficiary.token).then(
            function(data) {
                console.log(data);
                $scope.selection = 4;
            }
        );
    };

}]);
