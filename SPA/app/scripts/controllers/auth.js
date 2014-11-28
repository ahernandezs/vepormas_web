'use strict';

/**
 * login controller
 * inject a login function in the scope
 */
angular.module('spaApp')
.controller('LoginCtrl', ['$scope', '$http', '$location', 'api', '$rootScope', function ($scope,$http,$location, api, $rootScope) {
  /**
   * the login function connect the Rest-API: if the response status is OK, redirect to route "accounts",
   * else put an error message in the scope
   */
  if($rootScope.session_token && $location.$$path === '/login') {
    $location.path('/accounts');
  }


  $scope.checkUser = function(){
    $http({
      url: $scope.restAPIBaseUrl+'/checkLogin',
      method: 'POST',
      data: JSON.stringify({'user_login':$scope.username,'client_application_id': 'PROSA-DIG'})
    }).
      success(function(data, status, headers) {
        console.log(data);
    }).
      error(function(data, status) {
      $scope.errorMessage = data.message;
      $scope.status = status;
    });
  }

  /**
    Function for authenticate
  **/
  $scope.login = function(){
    $http({
      url: $scope.restAPIBaseUrl+'/login',
      method: 'POST',
      data: JSON.stringify({'user_login':$scope.username, 'password':$scope.password,'client_application_id': 'PROSA-DIG'})
    }).
      success(function(data, status, headers) {
      var token = headers('X-AUTH-TOKEN');
      $rootScope.session_token = token;
      $rootScope.last_access_date = data.last_access_date;
      $rootScope.last_access_media = data.last_access_media;

      api.init();

      $location.path( '/accounts' );
    }).
      error(function(data, status) {
      //put an error message in the scope
      $scope.errorMessage = data.message;
      $scope.status = status;
    });

  };

  $scope.logout = function() {
  }


}]);


