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

  /**
   * the currently logged user
   */
  var currentLoggedUser;

  /**
   * token card ID
   */
  var _cardId;

  /**
   * otp 1
   */
  var _otp1;

  /**
   * otp 2
   */
  var _otp2;

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
      _imageId = imageId.toString();
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
     * setter for card id
     */
    setCardId : function(cardId){
      _cardId = cardId;
    },

    /**
     * setter for otp 1
     */
    setOtp1 : function(otp1){
      _otp1 = otp1;
    },

    /**
     * setter for otp 2
     */
    setOtp2 : function(otp2){
      _otp2 = otp2;
    },

    /**
     * getter for preRegistrationData
     */
    getPreRegistrationData: function(){
      return _preRegistrationData;
    },

    /**
     * getter for registrationToken
     */
    getRegistrationToken: function(){
      return _registrationToken;
    },

    /**
     * reset  registrationToken
     */
    resetRegistrationToken: function(){
      _registrationToken = null;
      _cardId = null;
      _otp1 = null;
      _otp2 = null;
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
      var params = {
        'image_id':_imageId,
        'password':_password,
        'e_mail':_email,
        'phone': _phoneNumber
      };

      if(_cardId) {
        var tokenParams = {
          'secret_card_id':_cardId,
          'otp':_otp1,
          'otp2': _otp2
        }

        params = $.extend({}, params, tokenParams);
      }
      userService.registerUser(_registrationToken, params)
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
        var result = {'data' : data, 'status': status};
        return deferred.reject(result);
      })
      return  deferred.promise;
    },

    setCurrentUser: function(data){
      currentLoggedUser = data;
    },

    isCompleteUser: function(){
      var result = false;
      if(currentLoggedUser != null && currentLoggedUser.role_id == 1){
        result = true;
      }
      return result;
    }
  };
}
]);
