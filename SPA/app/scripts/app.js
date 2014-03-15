'use strict';

var app = angular.module('spaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pubnub.angular.service',
  'infinite-scroll'
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
        controller: 'AccountsCtrl',
        resolve: {
          accounts: function(accountsProvider) {
            return accountsProvider.getAccounts();
          }
        }
      })
      .when('/accounts/:accountId/transactions', {
        templateUrl: 'views/transactions.html',
        controller: 'TransactionsCtrl',
        resolve: {
          accounts: function(accountsProvider) {
            return accountsProvider.getAccounts();
          }
        }
      })
      .otherwise({
        redirectTo: '/accounts'
      });
  });

app.run(function(api, $window, $rootScope) {
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
});


