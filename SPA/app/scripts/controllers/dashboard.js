'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('DashBoardCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'userProvider', function ($rootScope, $scope, $location, $routeParams, accountsProvider, userProvider) {
	//TODO: temporal binding
	$scope.completeName = $rootScope.client_name;
	$scope.date = $rootScope.last_access_date;
	$scope.showAccountHeader = true;

  /**
    Function for logout application
  **/
  $scope.logout = function() {
    userProvider.logout().then(
      function(data) {
      console.log('logout: '+data);
      $rootScope.session_token = null;
      $location.path('login');
    });
  };


  $scope.selectNavigatOption = function(selectedOption){
    console.log('Selected Option --->' + selectedOption);
    switch(selectedOption) {
        case 'products':
          $scope.activeNavigationOption = 'products';
          $location.path('accounts');
          console.log($location.path());
        break;

        case 'transfers':
          $scope.activeNavigationOption = 'transfers';
          $location.path('transfers');
          console.log($location.path());
        break;

        case 'investments':
          $scope.activeNavigationOption = 'investments';
          console.log($location.path());
        break;

        case 'administration':
          $scope.activeNavigationOption = 'administration';
          $location.path('administration');
          console.log($location.path());
        break;
    }
  }
}]);
