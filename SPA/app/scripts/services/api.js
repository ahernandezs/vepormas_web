'use strict';

/**
 * api initializer factory
 */

angular.module('spaApp').factory('api', ['$http', '$rootScope', '$window', function ($http, $rootScope, $window) {
  var hasBeenConfigured = false;
  return {
    init: function (token) {

      if($window.x_session_token) {
        console.log("Session token from web app", $window.x_session_token);
        $rootScope.session_token = $window.x_session_token;

        $rootScope.last_access_date = $window.last_access_date
        $rootScope.last_access_media = $window.last_client_application_id;
        $rootScope.client_name = $window.client_name;
      }

      // this is the token of the bank
      $http.defaults.headers.common['X-BANK-TOKEN'] = 6;
      $http.defaults.headers.common['X-AUTH-TOKEN'] = token || $rootScope.session_token;

      //console.log("Executes init & token = " + $rootScope.session_token);
    },
    config: function(){
      // Use this link for deployment
      //$rootScope.restAPIBaseUrl = $("#linkApiRoot").attr("href");
      // Use these or similar link for development
      $rootScope.restAPIBaseUrl = "http://192.168.99.100/SBD";
      //$rootScope.restAPIBaseUrl = "http://localhost:8090/SBD";
      //$rootScope.restAPIBaseUrl = 'http://192.168.0.10:80/Abanking-Core';
      //$rootScope.restAPIBaseUrl = 'http://192.168.0.10:80/SBD';
      $rootScope.useMocks = false;
    }
  };
}]);
