'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('DashBoardCtrl', ['$rootScope', '$scope', '$location', '$routeParams', '$window', 
    'accountsProvider', 'userProvider', 'timerService', 'logoutService', function ($rootScope, $scope, $location, $routeParams, $window, accountsProvider, userProvider, timerService, logoutService) {

  if(!$rootScope.session_token) {
    //console.log("Redirecting to login");
    $location.path('login');
    return;
  }

	//TODO: temporal binding
	$scope.completeName = $rootScope.client_name;
	$scope.date = $rootScope.last_access_date;
	$scope.showAccountHeader = false;

  if($window.x_session_token) {
    $scope.useLogoutForm = true;
  }

  /**
    Function for logout application
  **/
  $scope.logout = function() {
    userProvider.logout().then(
      function(data) {
        timerService.stop();
        $rootScope.session_token = null;
        $location.path('login');
      },
      function(data){
        logoutService.displayErrorMessage();
        timerService.stop();
        $rootScope.session_token = null;
        $location.path('login');
      });
  };


  $scope.selectNavigatOption = function(selectedOption){
    //console.log('Selected Option --->' + selectedOption);
    switch(selectedOption) {
        case 'products':
          $scope.activeNavigationOption = 'products';
          $location.path('accounts');
          //console.log($location.path());
        break;

        case 'transfers':
          $scope.activeNavigationOption = 'transfers';
          $location.path('transfers');
          //console.log($location.path());
        break;

        case 'investments':
          $scope.activeNavigationOption = 'investments';
          $location.path('investments');
          //console.log($location.path());
        break;

        case 'administration':
          $scope.activeNavigationOption = 'administration';
          $location.path('administration');
          //console.log($location.path());
        break;

        case 'map':
          $location.path('map');
        break;
    }
  };

  $scope.$on('IdleTimeout', function() {
    $scope.showIdleAlert = true;
  });

  $scope.$on('WarningTimeout', function() {
    $scope.logout();
  });

  $scope.$on('IdleReset', function() {
    $scope.showIdleAlert = false;
  });
}]);
