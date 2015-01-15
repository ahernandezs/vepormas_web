'use strict';

angular.module('spaApp')
.factory('userProvider', ['$q','$rootScope','userService', function ($q, $rootScope, userService) {
  return {
    verifyUser: function(clientOrAccount,folio){
      var deferred = $q.defer();
      userService.getUser(clientOrAccount, folio).success(
        function(data, status, headers){
          console.log(JSON.stringify(data));
          $rootScope.registerToken = headers('X-REGISTER-TOKEN');
          deferred.resolve(data);
      }).error(
        function(data, status){
        console.log('error');
        return deferred.reject('Error to get user');
      })
      return deferred.promise;      
    },

    registerUser: function(identifier, imageId, password, email, cellPhone){
      var deferred = $q.defer();
      userService.setUser(identifier, imageId, password, email, cellPhone).success(function(data, status, headers){
        deferred.resolve();
      }).error(function(data, status){
        return deferred.reject('Error to register user');
      })
      return deferred.promise;
    },

    logout: function(){
      var deferred = $q.defer();
      userService.logout().success(function(data){
        deferred.resolve();
      }).error(function(data, status){
        return deferred.reject('Error in logout');
      })
      return  deferred.promise;
    }

  }
}
]);
