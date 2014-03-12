'use strict';

var app = angular.module('spaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pubnub.angular.service'
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

app.run(function(api) {
  api.config();
  api.init();
});
