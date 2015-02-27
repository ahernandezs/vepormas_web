'use strict';

angular.module('spaApp').controller('AdminCtrl', ['$rootScope', '$scope', 'adminProvider', '$location', function ($rootScope, $scope, adminProvider, $location) {

	$scope.adminOpt = 4;
	$scope.selection = 1;
	$scope.action = 1;
	$scope.data = {otp:''}
    $scope.stage = 1;
    $scope.change = {};
    $scope.stage_password = 1;


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

}]);
