'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('TransfersCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'userProvider', function ($rootScope, $scope, $location, $routeParams, accountsProvider, userProvider) {
	
    $scope.selection = 1;
    

	accountsProvider.getAccounts().then(
	function(data) {
		$scope.ownAccounts = $rootScope.accounts;
		}
	);


    /**
     * Function to navigate between steps.
	 */
	 $scope.completeStep = function(nextStep) {
		$scope.selection = nextStep;
	 };
}]);
