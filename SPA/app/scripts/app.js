'use strict';

var app = angular.module('spaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'infinite-scroll'
]);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    //$httpProvider.responseInterceptors.push('httpInterceptor');

    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/accounts', {
        templateUrl: 'views/accounts.html',
        controller: 'AccountsCtrl',
        /*resolve: {
          accounts: ['accountsProvider', function(accountsProvider) {
            return accountsProvider.getAccounts();
          }]*/
      })
      .when('/register',{
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);

app.run(['api', '$window', '$rootScope', function(api, $window, $rootScope) {
  api.config();
  api.init();

  $window.onbeforeunload = function(e) {
    var message = "Te vas a salir de ABanking, ¿estás seguro?";
    e = e || $window.event;
    e.preventDefault = true;
    e.cancelBubble = true;
    if($rootScope.session_token) {
    e.returnValue = message;

    return message;
    }
  }
}]);


