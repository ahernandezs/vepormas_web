'use strict';

var app = angular.module('spaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'infinite-scroll',
  'ngTable',
  'ui.router',
  'infinite-scroll'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    //$httpProvider.responseInterceptors.push('httpInterceptor');
  $urlRouterProvider.otherwise("/login");
  $stateProvider
    .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
    })

    .state('accounts', {
    url: '/accounts',
    templateUrl: 'views/accounts.html',
    controller: 'AccountsCtrl'
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


