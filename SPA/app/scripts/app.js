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
  $httpProvider.responseInterceptors.push('httpInterceptor');
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
    controller: 'DashBoardCtrl'
    })

    .state('dashboard.accounts', {
    url: 'accounts',
    views: {
        'accountContent' : {
          templateUrl: 'views/accounts.html',
          controller: 'AccountsCtrl'
        }
      }
    })

    .state('dashboard.accounts.creditcard', {
      url: '/:accountId/tdc',
      views:{
        'detailCreditCard' : {
          templateUrl: 'views/partials/cards/cards.html',
          controller: 'creditCardCtrl'
        }
      }
    })

    .state('dashboard.accounts.investment', {
      url: '/:accountId/investment',
      views:{
          'detailInvestment' : {
          templateUrl: 'views/partials/investment/investments.html',
          controller: 'InvestmentsCtrl'
        }
      }
    })

    .state('dashboard.accounts.deposit', {
      url: '/:accountId/deposit',
      views:{
        'detailDeposit' : {
        templateUrl: 'views/partials/deposit/deposit.html',
        controller: 'AccountDepositDetailCtrl'
        }
      }
    })

    .state('dashboard.accounts.credit', {
      url: '/:accountId/credit',
      views:{
        'detailCredit' : {
        templateUrl: 'views/partials/credits/credit.html',
         controller: 'creditCtrl'
        }
      }
    })
  
    .state('dashboard.transfers', {
        url: 'transfers',
        views: {
        'transferContent' : {
          templateUrl: 'views/transfers.html',
          controller: 'TransfersCtrl'
        }
      }
    })

    .state('dashboard.administration', {
        url: 'administration',
        views: {
        'administration' : {
          templateUrl: 'views/administration.html',
          controller: 'adminCtrl'
        }
      }
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
    var message = 'Te vas a salir de Consubanco, ¿estás seguro?';
    e = e || $window.event;
    e.preventDefault = true;
    e.cancelBubble = true;
    if($rootScope.session_token) {
      e.returnValue = message;

      return message;
    }
  }
}]);



