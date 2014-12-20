'use strict';

var app = angular.module('spaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'infinite-scroll',
  'ngTable',
  'ui.router'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

  $urlRouterProvider.otherwise("/login");
  //$httpProvider.responseInterceptors.push('httpInterceptor');
  $stateProvider
    .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
    })

    .state('dashboard', {
    //abstract: true,
    url: '/accounts',
    templateUrl: 'views/dashboard.html',
    controller: 'DashBoardCtrl'
    })

    .state('dashboard.credit', {
    url: '/credit/:accountId',
    templateUrl: 'views/partials/cards/cards.html',
    controller: 'AccountDetailCtrl'
    })

    .state('dashboard.creditcard', {
      url: '/creditcard/:accountId',
      templateUrl: 'views/partials/cards/cards.html',
      controller: 'creditCardCtrl'
    })

    .state('dashboard.investment', {
      url: '/investment/:accountId',
      templateUrl: 'views/partials/investment/investments.html',
      controller: 'InvestmentsCtrl'
    })

    .state('dashboard.deposit', {
    url: '/deposit/:accountId',
    templateUrl: 'views/partials/deposit/deposit.html',
    controller: 'AccountDepositDetailCtrl'
    })

    .state('register', {
    url: '/register',
    templateUrl: 'views/register.html',
    controller: 'RegisterCtrl'
    })

  }]);

app.run(['api', '$window', '$rootScope',function(api, $window, $rootScope) {
  api.config();
  api.init();

  $window.onbeforeunload = function(e) {
    var message = 'Te vas a salir de Consubanco, ¿est&aacute;s seguro?';
    e = e || $window.event;
    e.preventDefault = true;
    e.cancelBubble = true;
    if($rootScope.session_token) {
      e.returnValue = message;

      return message;
    }
  }
}]);



