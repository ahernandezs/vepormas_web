'use strict';

angular.module('spaApp').controller('TransactionsCtrl', function($scope, $http, $location, $routeParams) {
  $http({
    url: $scope.restAPIBaseUrl+'/accounts/' + $routeParams.accountId + '/transactions',
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

  $scope.showAccount = true;
  $scope.showTxnDetail = false;
  $scope.currentTransaction = undefined;

  $scope.showTransactionDetail = function(transaction) {
    if($scope.currentTransaction && $scope.currentTransaction._transaction_id === transaction._transaction_id) {
      $scope.showAccount = true;
      $scope.showTxnDetail = false;
      $scope.currentTransaction = undefined;
    } else {
      $scope.showAccount = false;
      $scope.showTxnDetail = true;
      $scope.currentTransaction = transaction;
    }
  }
});
