'use strict';

angular.module('spaApp')
  .factory('thirdAccountProvider', ['$q','$rootScope','thirdAccountService',function ($q, $rootScope, thirdAccountService) {

    return {
      getThirdAccounts: function () {

        var deferred = $q.defer();

        if(!$rootScope.thirdAccounts) {
          thirdAccountService.getThirdAcounts().success(function(data, status, headers) {
            $rootScope.thirdAccounts = data;
            deferred.resolve();
          }).error(function(data, status) {
            return deferred.reject('Error getting third accounts');
          });
        } else {
          deferred.resolve();
        }
      return deferred.promise;
      },

      setBeneficiary: function(name, clabe, amount, email, phone){

        var deferred = $q.defer();
        thirdAccountService.setBeneficiary(name, clabe, amount, email, phone).success(function(data, status, headers){
            deferred.resolve();
        }).error(function(data, status){
            return deferred.reject('Error setting beneficiary');
        })
        return deferred.promise;
      }
    }
  }]);
