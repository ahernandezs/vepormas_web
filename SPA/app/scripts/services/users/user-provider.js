'use strict';

angular.module('spaApp')
.factory('userProvider', ['$q','$rootScope','userService',function ($q, $rootScope, userService) {
  return {
    verifyUser: function(clientOrAccount,folio){
      var deferred = $q.defer();
      userService.getUser(clientOrAccount, folio).success(function(data, status, headers){
        deferred.resolve();
      }).error(function(data, status){
        return deferred.reject('Error to get user');
      })
      return deferred.promise;      
    },

    registerUser: function(identifier, cardId, imageId, password, email, cellPhone){
      var deferred = $q.defer();
      userService.setUser(identifier, cardId, imageId, password, email, cellPhone).success(function(data, status, headers){
        deferred.resolve();
      }).error(function(data, status){
        return deferred.reject('Error to register user');
      })
      return deferred.promise;
    }
  }
}
]);
