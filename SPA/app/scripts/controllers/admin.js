'use strict';

angular.module('spaApp').controller('adminCtrl', ['$rootScope', '$scope', 'adminProvider', function ($rootScope, $scope, adminProvider) {

	$scope.selection = 1;
	$scope.action = 1;
	$scope.data = {otp:''}

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

}]);
