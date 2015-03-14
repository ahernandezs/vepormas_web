'use strict';

angular.module('spaApp').factory('thirdAccountProvider', ['$q','thirdAccountService',function ($q, thirdAccountService){
  
  var thirdAccounts;

  /**
   * reload third-account cache from the middleware. Must never be invoked from outside
   */
  function loadThirdAccounts() {
    var deferred = $q.defer();
    console.log('loading third-account from middleware');
    thirdAccountService.getThirdAcounts().success(
      function(data, status, headers) {
        console.log('third-account loaded successfully', data);
        thirdAccounts = data.third_accounts;
        deferred.resolve(thirdAccounts);
      }).error(function(data, status) {
        console.log('third-account failed to load', data, status);
        var result = {'response' : data, 'status': status};
        deferred.reject(result);
      });
    return deferred.promise;
  }

  return {

    /**
     * validate a CLABE, account-number, card-number. If it is from Consubanco, the owner's name is returned
     */
    validateThirdAccount: function(account){
      var deferred = $q.defer();
        thirdAccountService.validateThirdAccount(account).success(function(data, status, headers){
            deferred.resolve(data);
        }).error(function(data, status){
          console.log(data, status);
          var result = {'response' : data, 'status': status};
          deferred.reject(result);
        })
      return deferred.promise;
    },

    /**
     * get third-accounts from cache
     */
    getThirdAccounts: function () {
      var deferred = $q.defer();
      console.log('getting third-accounts');
      if(!thirdAccounts) {
        return loadThirdAccounts();
      } else {
        console.log('getting third-accounts from cache');
        deferred.resolve(thirdAccounts);
      }
      return deferred.promise;
    },

    /**
     * register a new third-account. The account-number must be obtained by the validateThirdAccount operation's result
     */
    registerThirdAccount: function(alias, beneficiaryName, e_mail, phone, accountNumber, otp){
      var deferred = $q.defer();
      console.log('registering third-account');
      thirdAccountService.registerThirdAccount(alias, beneficiaryName, e_mail, phone, accountNumber, otp).then(
        function(data, status, headers){
          console.log('third-account registered successfully');
          return loadThirdAccounts();
        }
      ).then(
        function(data, status, headers){
          deferred.resolve(thirdAccounts);
        }
      ).catch(
        function(data, status){
          console.log('failed ro register third-account');
          var result = {'response' : data, 'status': status};
          console.log(data, status);
          deferred.reject(result);
        }
      )
      return deferred.promise;
    },

    /**
     * unregister a third-account
     */
    unregisterThirdAccount:function(thirdAccountID,otp){
      var deferred = $q.defer();
      console.log('unregistering third-account');
      thirdAccountService.unregisterThirdAccount(thirdAccountID).then(
        function(data, status, headers){
          console.log('third-account unregistered successfully');
          return loadThirdAccounts();
        }
      ).then(
        function(data, status, headers){
          deferred.resolve(thirdAccounts);
        }
      ).error(function(data, status){
        console.log('failed to unregister third-account');
        var result = {'response' : data, 'status': status};
        console.log(data, status);
        return deferred.reject(result);
      })
      return deferred.promise;
    }
  }
}]);
