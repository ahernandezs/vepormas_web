'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('TransfersCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'userProvider', function ($rootScope, $scope, $location, $routeParams, accountsProvider, userProvider) {
	
    $scope.selection = 1;
    
    /**
     * Function to navigate between steps.
	 */
	 $scope.completeStep = function(nextStep) {
		$scope.selection = nextStep;
	 };
     
}]);
