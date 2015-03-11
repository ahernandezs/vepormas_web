'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
 angular.module('spaApp').controller('MainCtrl', ['$scope', function ( $scope) {
	
    $scope.hasServiceError=false;

    /**
     * set an error message
     */
    $scope.setServiceError = function(message) {
        $scope.serviceErrorMessage = message;
        $scope.hasServiceError = true;
    };

    /**
     * remove an error message
     */
    $scope.resetServiceError= function() {
        $scope.serviceErrorMessage = null;
        $scope.hasServiceError = false;
    };

}]);
