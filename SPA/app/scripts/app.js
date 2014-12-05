'use strict';

var app = angular.module('spaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngMockE2E',
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
      .when('/products',{
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);

app.run(['api', '$window', '$rootScope','$httpBackend','mockService', function(api, $window, $rootScope,$httpBackend,mockService) {
  api.config();
  api.init();

  //Escape string to be able to use it in a regular expression
  function regEsc(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }
  //When backend receives a request to the views folder, pass it through
  $httpBackend.whenGET( RegExp( regEsc( 'views/' ) ) ).passThrough();
  //Only load mocks if config says so
  if(!$rootScope.useMocks) return;
  $httpBackend.whenPOST($rootScope.restAPIBaseUrl + '/checkLogin').respond(function(method, url, data, headers) {
    var message = {res:'mock'}
    return [200, message, {}];
  });

  $httpBackend.whenPOST($rootScope.restAPIBaseUrl + '/login').respond(function(method, url, data, headers) {
    var message = {res:'mock'}
    messages.data.push(message);
    return [200, message, {}];
  });

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


