'use strict';

angular.module('spaApp').controller('adminCtrl', ['$rootScope', '$scope', 'adminProvider', function ($rootScope, $scope, adminProvider) {

	$scope.selection = 1;
	$scope.action = 1;

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

	adminProvider.getThirdAccounts().then(function(data) {
		$scope.third_accounts = $rootScope.third_accounts;
	});


}]);
