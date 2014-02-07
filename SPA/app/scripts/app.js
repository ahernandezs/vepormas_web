'use strict';

var app = angular.module('spaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $httpProvider.responseInterceptors.push('httpInterceptor');

    $urlRouterProvider.otherwise("/accounts");

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('dashboard', {
        abstract: true,
        url: '/',
        templateUrl: 'views/dashboard.html',
      })
      .state('dashboard.accounts', {
        url: 'accounts',
        templateUrl: 'views/accounts.html',
        controller: 'AccountsCtrl'
      })
      .state('dashboard.transactions', {
        url: 'account/:account_id/transactions',
        templateUrl: 'views/transactions.html',
        controller: 'TransactionsCtrl'
      });
  });

app.run(function(api) {
  api.init();
});