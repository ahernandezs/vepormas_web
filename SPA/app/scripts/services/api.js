'use strict';

/**
 * api initializer factory
 */

angular.module('spaApp').factory('api', ['$http', '$rootScope', function ($http, $rootScope) {
  var hasBeenConfigured = false;
  return {
    init: function (token) {
      // this is the token of the bank
      $http.defaults.headers.common['X-BANK-TOKEN'] = 4;
      $http.defaults.headers.common['X-AUTH-TOKEN'] = token || $rootScope.session_token;

      //console.log("Executes init & token = " + $rootScope.session_token);
    },
    config: function(){
      // Use this link for deployment
      $rootScope.restAPIBaseUrl = $("#linkApiRoot").attr("href");
      // Use these or similar link for development
      //$rootScope.restAPIBaseUrl = "http://192.168.210.136/Abanking-Core";
      //$rootScope.restAPIBaseUrl = "http://localhost:18080/Abanking-Core";
      //$rootScope.restAPIBaseUrl = 'http://192.168.0.10:80/Abanking-Core';
      //$rootScope.restAPIBaseUrl = 'http://192.168.0.10:80/Abanking-Core';
      $rootScope.useMocks = false;
    }
  };
}]);
