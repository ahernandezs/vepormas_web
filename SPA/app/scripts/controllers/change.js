'use strict';

/**
 * Controller to change the password.
 */
angular.module('spaApp').controller('ChangeCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'adminProvider', function ($rootScope, $scope, $location, $routeParams, adminProvider) {

    $scope.stage = 1;
    $scope.change = {};

    console.log('cargando ChangeCtrl');
    /**
     * Evaluates if the new passwords are equals.
     */
    $scope.verifyNewPass = function () {

        console.log('verificando')

        if( $scope.change.new == '' ||  $scope.change.repeatNew == '' || $scope.change.old == '' ){
            $scope.errorMessage = "Favor de completar todos los campos";
            $scope.showError = true;
        }

        if ( $scope.change.new !== $scope.change.repeatNew ){
            $scope.errorMessage = "Las contraseñas no coinciden";
            $scope.showError = true;
        }else{
            $scope.stage = 2;
        }
    };

    /**
     * Send the new password to the service.
     */
    $scope.modifyPassword = function() {
        adminProvider.updatePassword($scope.change.old, $scope.change.new).then(function(data){
            console.log('result: '+data);
        });
        $scope.stage = 3;
    };

}]);
