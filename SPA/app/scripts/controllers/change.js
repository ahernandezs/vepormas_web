'use strict';

/**
 * Controller to change the password.
 */
angular.module('spaApp').controller('ChangeCtrl', ['$rootScope', '$scope', '$location', '$routeParams', function ($rootScope, $scope, $location, $routeParams) {

    $scope.selection = 1;
    $scope.change = {};

    /**
     * Evaluates if the new passwords are equals.
     */
    $scope.verifyNewPass = function () {
        if ( $scope.change.new !== $scope.change.repeatNew )
            $scope.errorMessage = "Las contrase&ntilde;as no coinciden";
        else
            $scope.selection = 2;
    };

    /**
     * Send the new password to the service.
     */
    $scope.modifyPassword = function() {
        // TODO
        $scope.selection = 3;
    };

}]);
