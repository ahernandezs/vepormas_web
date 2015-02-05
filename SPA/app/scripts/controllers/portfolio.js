'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('PortfolioCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', function ($rootScope, $scope, $location, $routeParams, accountsProvider) {
	
    $scope.selection = 1;
    $scope.first = 1;
    $scope.portfolio = {};
    $scope.invType = 'VISTA';
    
    /**
     * Function to navigate between steps.
	 */
	 $scope.completeStep = function(nextStep) {
         $scope.selection = nextStep;
	 };
    
    /**
     * Assigns the value to the first view to return to and the investment type.
     */
    $scope.assignValue = function(val, type) {
        $scope.selection = val;
        $scope.first = val;
        $scope.invType = type;
    };
    
}]);
