'use strict';

angular.module('spaApp').controller('TransactionsCtrl', function($scope, $http, $location, $routeParams, $timeout) {
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

  $scope.selection = "";
  $scope.currentTransaction = undefined;

  $scope.showTransactionDetail = function(transaction) {
    if($scope.currentTransaction && $scope.currentTransaction._transaction_id === transaction._transaction_id) {
      $scope.selection = undefined;
      $scope.currentTransaction = undefined;
    } else {
      $scope.selection = 'transaction';
      $scope.currentTransaction = transaction;
    }
  }

  $scope.close = function() {
    $scope.selection = undefined;
    $scope.currentTransaction = undefined;
  }

  $scope.showServices = function() {
    $scope.selection = "services";
    $scope.currentTransaction = undefined;
  }

  $scope.showServicePayment = function() {
    $scope.selection = 'servicespayment';
  }

  $scope.showServicePaymentToken = function() {
    $scope.selection = 'servicespaymenttoken';
    $scope.token = undefined;

    $timeout( function() {
      $scope.token = true;
    },2000);
  }

  $scope.applyServicePayment = function() {
    $scope.selection = 'applyservicespayment';
  }
});
