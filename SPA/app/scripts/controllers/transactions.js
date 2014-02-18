'use strict';

angular.module('spaApp').controller('TransactionsCtrl', function($scope, $http, $location, $routeParams) {
  $http({
    url: 'http://abanking-ext-api.herokuapp.com/api/accounts/' + $routeParams.accountId + '/transactions',
    method: 'GET'
  }).
    success(function(data, status, headers) {
    $scope.account = data.account;
    $scope.transactions = data.transactions;
  }).
    error(function(data, status) {
    console.log(data, status);
    $location.path( '/login' );
  });
});
