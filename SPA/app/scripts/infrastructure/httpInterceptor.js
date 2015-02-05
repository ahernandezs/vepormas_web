'use strict';

angular.module('spaApp').factory('httpInterceptor', ['$q', '$window', '$location', '$rootScope', function httpInterceptor ($q, $window, $location, $rootScope) {
  return function (promise) {
    var success = function (response) {
      return response;
    };

    var error = function (response) {
      // TODO: Seems that in some time we don't get response.status

      if (!response.status) {
        console.log("Response undefined");
        $location.url('/login');
      }

      if (response.status === 401) {
        console.log("Status 400 or 503");

        $rootScope.session_token = null;
        if($window.x_session_token) {
          $window.x_session_token = null;
          $window.location.href = "login";
        } else {
          $location.url('/login');
        }
      }

      return $q.reject(response);
    };

    return promise.then(success, error);
  };

}]);
