'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('PortfolioCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'userProvider', 'thirdAccountProvider', function ($rootScope, $scope, $location, $routeParams, accountsProvider, userProvider, thirdAccountProvider) {
	
    $scope.selection = 1;
    $scope.first = 1;
    $scope.portfolio = {};
    
    /**
     * Function to navigate between steps.
	 */
	 $scope.completeStep = function(nextStep) {
         $scope.selection = nextStep;
	 };
    
    /**
     *
     */
    $scope.assignValue = function(val) {
        $scope.selection = val;
        $scope.first = val;
    };
    
}]);
