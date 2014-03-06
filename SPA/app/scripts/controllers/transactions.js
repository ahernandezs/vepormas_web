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

  $scope.selectedCard = null;

  $scope.showCards = function() {
    $scope.selection = "cards";
    $scope.currentTransaction = undefined;

    $scope.card = {
      current : null
    };

    $scope.cards =
      [
        {id: 1, name: "Roberto Rivera López", lastdigits: "**123"},
        {id: 2, name: "Luis López Pérez", lastdigits: "**234"},
        {id: 3, name: "Alejandro García Gómez", lastdigits: "**345"},
        {id: 4, name: "Alicia Rubinstein", lastdigits: "**456"}
    ];

  }

  $scope.updateCard = function() {
    $scope.selection = "cardspayment";
  }

  $scope.showCardPaymentToken = function() {
    $scope.selection = 'cardspaymenttoken';
    $scope.token = undefined;

    $timeout( function() {
      $scope.token = true;
    },2000);
  }

  $scope.applyCardPayment = function() {
    $scope.selection = 'applycardpayment';
  }

  $scope.showTransfers = function() {
    $scope.selection = "transfers";
    $scope.currentTransaction = undefined;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'/'+mm+'/'+yyyy;

    $scope.beneficiary = {
      current : null
    };

    $scope.transfer = {
      amount: "",
      date: today,
      sendmail: false,
      message: ""
    };


    $scope.beneficiaries =
      [
        {id: 1, name: "Roberto Rivera López", lastdigits: "**123", alias: "primo", currency: "MXN", bankname: "BBVA Bancomer", bankicon: "", email: "robert@gmail.com"},
        {id: 2, name: "Luis López Pérez", lastdigits: "**234", alias: "tío", currency: "MXN", bankname: "BBVA Bancomer", bankicon: "", email: "llopez@gmail.com"},
        {id: 3, name: "Perla García Gómez", lastdigits: "**345", alias: "mamá", currency: "MXN", bankname: "Banamex", bankicon: "", email: "pgarcia@gmail.com"},
        {id: 4, name: "Alicia Rubinstein", lastdigits: "**456", alias: "prima", currency: "MXN", bankname: "Banorte", bankicon: "", email: "arubinstein@gmail.com"}
    ];

  }

  $scope.updateTransfer = function() {
    $scope.selection = "transferspayment";
  }

  $scope.showTransferPaymentToken = function() {
    $scope.selection = 'transferspaymenttoken';
    $scope.token = undefined;

    $timeout( function() {
      $scope.token = true;
    },2000);
  }

  $scope.applyTransferPayment = function() {
    $scope.selection = 'applytransferpayment';
  }

  $scope.sorting = {
    column : 'created_at',
    descending : true
  };

  $scope.selectSortingClass = function(column){
    return column == $scope.sorting.column && 'glyphicon-chevron-'+($scope.sorting.descending?'down':'up');
  }

  $scope.changeSorting = function(column) {
    var sort = $scope.sorting;
    if (sort.column == column) {
      sort.descending = !sort.descending;
    } else {
      sort.column = column;
      sort.descending = false;
    }
  }
});
