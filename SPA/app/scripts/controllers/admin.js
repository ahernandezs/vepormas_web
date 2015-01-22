'use strict';

angular.module('spaApp').controller('adminCtrl', ['$rootScope', '$scope', 'adminProvider', function ($rootScope, $scope, adminProvider) {

	$scope.selection = 1;

	$scope.selectBeneficiary = function(){
		$scope.action = 1;
		console.log('mostrar la partial con el usuario, el beneficiary-delete-1.html');
	}


	adminProvider.getThirdAccounts().then(function(data) {
		$scope.third_accounts = $rootScope.third_accounts;
	});


}]);
