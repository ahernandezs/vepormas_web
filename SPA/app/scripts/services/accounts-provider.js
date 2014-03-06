'use strict';

/**
 * api initializer factory
 */

angular.module('spaApp').factory('accountsProvider', function ($rootScope, accountsService, $location) {
    $rootScope.accounts;
    $rootScope.currentAccount;

    return {
        setAccounts: function (accounts) {
            $rootScope.accounts = accounts;
        },
        getAccountIndex: function (accountId) {
            for (var i = 0; i < $rootScope.accounts.length; i++) {
                if ($rootScope.accounts[i]._account_id == accountId) {
                    return i;
                }
            }
            return -1;
        },
        getAccounts: function () {
            if(!$rootScope.accounts){
                console.log('get accounts');
                accountsService.getAccounts().
                  success(function(data, status, headers) {
                  $rootScope.accounts = data.accounts;
                }).
                error(function(data, status) {
                  console.log(data, status);
                  $location.path( '/login' );
                });
            }
            return $rootScope.accounts;
            },
        getAccount: function (accountId) {
            var index = this.getAccountIndex(accountId);
            
            //if account not found
            if(index<0) {
                return;
            }
            //if accounts has undefinied transactions get transactions from API
            if(!$rootScope.accounts[index].transactions){
                accountsService.getAccount(accountId).
                  success(function(data, status, headers) {
                    $rootScope.currentAccount = data.account;
                    $rootScope.currentAccount.transactions = data.transactions;

                    $rootScope.accounts[index] = $rootScope.currentAccount;
                }).
                error(function(data, status) {
                  console.log(data, status);
                  $location.path( '/login' );
                });
            }
            else{ 
                //fill currentAccount with rootScope data
                $rootScope.currentAccount = $rootScope.accounts[index];
            }
            return $rootScope.accounts;
        },
        addNewTransaction: function (user, transaction, account) {
            var index = this.getAccountIndex(account._account_id);
         
            if (index < 0) {
                if(index<0) $location.path( '/login' );
            return;
            }
                //if there is no transactions just update account
                if(!$rootScope.accounts[index].transactions){
                    $rootScope.$apply(function () {
                        $rootScope.accounts[index] = account;
                    });
                }
                else  
                //update account and add new transaction
                {
                    //getting account transactions
                    var transactions = $rootScope.accounts[index].transactions;
                    //adding new transaction on index 0
                    transactions.splice(0,0,transaction)
                    account.transactions = transactions;
                    
                    $rootScope.$apply(function () {
                        $rootScope.accounts[index] = account;
                        
                        //updating current transaction if necesary
                        if($rootScope.currentAccount._account_id == account._account_id){
                            $rootScope.currentAccount = account;
                        }
                    });
                }
        },
        getCurrentAccount: function(){
            return $rootScope.currentAccount;
        }
    };
});