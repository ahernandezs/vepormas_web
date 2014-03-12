'use strict';

/**
 * api initializer factory
 */

angular.module('spaApp').factory('accountsProvider', function ($rootScope, accountsService, $q) {

  return {
    getAccountIndex: function (accountId) {
      for (var i = 0; i < $rootScope.accounts.length; i++) {
        if ($rootScope.accounts[i]._account_id == accountId) {
          return i;
        }
      }
      return -1;
    },

    getAccounts: function () {
      var deferred = $q.defer();

      if(!$rootScope.accounts) {
        console.log('getting accounts');
        accountsService.getAccounts().success(function(data, status, headers) {
          $rootScope.accounts = data.accounts;
          deferred.resolve();
        }).error(function(data, status) {
          console.log(data, status);
          return deferred.reject("Error getting accounts");
        });
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    },

    getAccountTransactions: function (accountId) {
      var index = this.getAccountIndex(accountId);

      //TODO: handle this error
      if(index<0) {
        return;
      }

      var deferred = $q.defer();

      //if accounts has undefinied transactions get transactions from API
      if(!$rootScope.accounts[index].transactions) {
        console.log('getting transactions for account ' + accountId);
        accountsService.getAccount(accountId).success(function(data, status, headers) {
          $rootScope.accounts[index].transactions = data.transactions;
          $rootScope.currentAccount = $rootScope.accounts[index];
          $rootScope.currentAccount.transactions = data.transactions;
          deferred.resolve();
        }).error(function(data, status) {
          console.log(data, status);
          return deferred.reject("Error getting transactions");
        });
      } else {
        $rootScope.currentAccount = $rootScope.accounts[index];
        deferred.resolve();
      }

      //fill currentAccount with rootScope data

      return deferred.promise;
    },

    addNewTransaction: function (user, transaction, account) {
      var index = this.getAccountIndex(account._account_id);

      if (index < 0) {
        return;
      }
      //if there is no transactions just update account
      if($rootScope.currentAccount && $rootScope.currentAccount._account_id == account._account_id && !$rootScope.accounts[index].transactions){
        $rootScope.$apply(function () {
          $rootScope.accounts[index].balance = account.balance;
        });
      } else
        //update account and add new transaction
        {
          //getting account transactions
          if(!$rootScope.accounts[index].transactions) {
            $rootScope.accounts[index].transactions = [transaction];
          } else {
            //adding new transaction on index 0
            $rootScope.accounts[index].transactions.splice(0,0,transaction)
          }

          $rootScope.$apply(function () {
            $rootScope.accounts[index].balance = account.balance;

            //updating current transaction if necesary
            if($rootScope.currentAccount && $rootScope.currentAccount._account_id === account._account_id){
              $rootScope.currentAccount.balance = account.balance;
            }
          });
        }
    }
  };
});
