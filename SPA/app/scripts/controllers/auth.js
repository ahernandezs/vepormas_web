'use strict';

/**
 * login controller
 * inject a login function in the scope
 */
angular.module('spaApp')
.controller('LoginCtrl', function ($scope,$http,$location, $cookieStore, api) {
  /**
   * the login function connect the Rest-API: if the response status is OK, redirect to route "accounts",
   * else put an error message in the scope
   */
  $scope.login=function(){
    $http({
      url: $scope.restAPIBaseUrl+'/login',
      method: 'POST',
      data: JSON.stringify({'username':$scope.username, 'password':$scope.password,'access_media': 'SPA'})
    }).
      success(function(data, status, headers) {
      //get the session token from the response and store it in a cookieStore
      var token = headers('X-AUTH-TOKEN');

      $cookieStore.put('token', token);

      api.init();

      $scope.initPubNub();

      $location.path( '/accounts' );
    }).
      error(function(data, status) {
      //put an error message in the scope
      $scope.errorMessage = 'login failed';
      $scope.status = status;
    });

  };

  $scope.logout = function() {
    $http({
      url: $scope.restAPIBaseUrl+'/logout',
      method: 'GET'
    }).
      success(function(data, status, headers) {
      // removes token in the cookieStore
      $scope.message = 'logout successful';
      $scope.status = status;
      $cookieStore.remove('token');
      $location.path( '/login' );
    }).
      error(function(data, status) {
      //put an error message in the scope
      $scope.errorMessage = 'logout failed';
      $scope.status = status;
      $cookieStore.remove('token');
      $location.path( '/login' );
    });
  }
});


