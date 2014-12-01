'use strict';

angular.module('spaApp')
  .factory('RegisterProvider', ['$q','$rootScope','registerService',function ($q, $rootScope, registerService) {
      setUser: function(name, clabe, amount, email, phone){
        var deferred = $q.defer();
        registerService.setUser(name, clabe, amount, email, phone).success(function(data, status, headers){
            deferred.resolve();
        }).error(function(data, status){
            return deferred.reject('Error to register user');
        })
        return deferred.promise;
      }
    }
  }]);
