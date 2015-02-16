'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('PortfolioCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'transferProvider', function ($rootScope, $scope, $location, $routeParams, accountsProvider, transferProvider) {

    $scope.selection = 1;
    $scope.portfolio = {};
    $scope.invType = 'VISTA';
    $scope.theAccounts = [];

    /**
     * Get investments products.
     */
    transferProvider.getProducts().then(
        function(data) {
            $scope.invProducts = $rootScope.invProducts;
        }
    );

    /**
     * Get the own accounts.
     */
    accountsProvider.getAccounts().then(
        function(data) {
            $rootScope.accounts.forEach(
                function (value, index, ar) {
                    value.group = 'Cuentas Propias';
                    $scope.theAccounts.push( value );
                }
            );
        }
    );

    /**
     * Function to navigate between steps.
	 */
	$scope.completeStep = function(nextStep) {
        $scope.selection = nextStep;
		if (nextStep == 1)
			$scope.portfolio = {};
	 };

    /**
     * Assigns the value to the first view to return to and the investment type.
     */
    $scope.change = function(type) {
        $scope.selection = 1;
        $scope.invType = type;
    };

}]);
