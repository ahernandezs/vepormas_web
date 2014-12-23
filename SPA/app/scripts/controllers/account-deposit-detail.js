'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
 angular.module('spaApp').controller('AccountDepositDetailCtrl', ['$scope', '$location','$rootScope', 'accountsProvider', function ($scope, $location, $rootScope,accountsProvider) {

	console.log('Load account deposit detail information '+$scope.selectedAcccountId + ' ' + $scope.selectedAccountType );
	accountsProvider.getAccountDetail($scope.selectedAcccountId+'-'+$scope.selectedAccountType).then(
		function(data) {
			$scope.accountDetail = $rootScope.accounts;
		});
}]);
