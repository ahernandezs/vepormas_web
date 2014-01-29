'use strict';

var app = angular.module('spaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]);

app.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.responseInterceptors.push('httpInterceptor');

    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/accounts', {
        templateUrl: 'views/accounts.html',
        controller: 'AccountsCtrl'
      })
      .otherwise({
        redirectTo: '/accounts'
      });
  });

app.run(function(api) {
  api.init();
});