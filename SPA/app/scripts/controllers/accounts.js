'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('AccountsCtrl', ['$scope', '$location', function ($scope, $location) {
	//TODO: temporal binding
	$scope.completeName = 'ABEL BECERRA CASTRO';
	$scope.date = '17/05/2014';
	$scope.time = '23:34:54';


  /**
    Function for logout application
  **/
  $scope.logout = function() {
	$location.path('/login');
  }

}]);
