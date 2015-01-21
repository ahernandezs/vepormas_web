'use strict';

angular.module('spaApp')
.factory('userProvider', ['$q','$rootScope','userService', function ($q, $rootScope, userService) {
  
  /**
    * the http token-registration header value use to retreive the client's information
    * between the preRegister and register operations
    */
  var _registrationToken;

  /**
    * the client's identifier
    */
  var _clientId;

  /**
    * the client image's identifier
    */
  var _imageId;

  /**
    * the client password
    */
  var _password;

  /**
    * the client's email
    */
  var _email;

  /**
    * the client's phone-number
    */
  var _phoneNumber;

  /**
    * the preRegister result
    */
  var _preRegistrationData;

  return {
    
    /**
     * setter for client_id
     */
    setClientId : function(clientId){
      _clientId = clientId;
    },

    /**
     * setter for image_id
     */
    setImageId : function(imageId){
      _imageId = imageId;
    },

    /**
     * setter for password
     */
    setPassword : function(password){
      _password = password;
    },

    /**
     * setter for e_mail
     */
    setEmail : function(email){
      _email = email;
    },

    /**
     * setter for e_mail
     */
    setPhoneNumber : function(phoneNumber){
      _phoneNumber = phoneNumber;
    },

    /**
     * getter for preRegistrationData
     */
    getPreRegistrationData: function(){
      return _preRegistrationData;
    },

    /**
     * pre-register the client
     */
    preRegisterUser : function(folioId){
      var deferred = $q.defer();
      userService.preRegisterUser(_clientId, folioId).success(
        function(data, status, headers){
          console.log(JSON.stringify(data));
          _registrationToken = headers('X-REGISTER-TOKEN');
          _preRegistrationData = data;
          deferred.resolve(data);
      }).error(
        function(data, status){
        console.log('error');
        return deferred.reject('Error to get user');
      })
      return deferred.promise;      
    },

    registerUser: function(){
      var deferred = $q.defer();
      userService.registerUser(_registrationToken, _imageId, _password, _email, _phoneNumber)
      .success(function(data, status, headers){
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
