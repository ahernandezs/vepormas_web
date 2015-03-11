'use strict';

angular.module('spaApp')
  .factory('thirdAccountProvider', ['$q','$rootScope','thirdAccountService',function ($q, $rootScope, thirdAccountService) {

    return {

      validateThirdAccount: function(account){
        var deferred = $q.defer();
          thirdAccountService.validateThirdAccount(account).success(function(data, status, headers){
              $rootScope.thirdAccountValidation = data;
              deferred.resolve();
          }).error(function(data, status){
            var result = {'response' : data, 'status': status};
            console.log(data, status);
            return deferred.reject(result);
          })
        return deferred.promise;
      },

      getThirdAccounts: function () {

        var deferred = $q.defer();

        if(!$rootScope.thirdAccounts) {
          thirdAccountService.getThirdAcounts().success(function(data, status, headers) {
            $rootScope.thirdAccounts = data.third_accounts;
            deferred.resolve();
          }).error(function(data, status) {
            var result = {'response' : data, 'status': status};
            console.log(data, status);
            return deferred.reject(result);
          });
        } else {
          deferred.resolve();
        }
      return deferred.promise;
      },

      registerThirdAccount: function(alias, beneficiaryName, e_mail, phone, accountNumber, otp){
        var deferred = $q.defer();
        thirdAccountService.registerThirdAccount(alias, beneficiaryName, e_mail, phone, accountNumber, otp).success(function(data, status, headers){
            deferred.resolve();
        }).error(function(data, status){
          var result = {'response' : data, 'status': status};
          console.log(data, status);
          return deferred.reject(result);
        })
        return deferred.promise;
      },

      unregisterThirdAccount:function(thirdAccountID,otp){
        var deferred = $q.defer();
        thirdAccountService.unregisterThirdAccount(thirdAccountID).success(function(data, status, headers){
            deferred.resolve();
        }).error(function(data, status){
          var result = {'response' : data, 'status': status};
          console.log(data, status);
          return deferred.reject(result);
        })
        return deferred.promise;
      }

    }
  }]);
