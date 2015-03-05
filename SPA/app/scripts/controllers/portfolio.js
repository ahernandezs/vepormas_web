'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('PortfolioCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'transferProvider', function ($rootScope, $scope, $location, $routeParams, accountsProvider, transferProvider) {

    $scope.invType = 'VISTA';

    /**
     * Assigns the value to the first view to return to and the investment type.
     */
    $scope.change = function(type) {
        $scope.invType = type;
    };

}]);
