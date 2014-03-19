'use strict';

angular.module('spaApp').factory('httpInterceptor', function httpInterceptor ($q, $window, $location, $cookieStore) {
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

      if (response.status === 400 || response.status === 503) {
        $cookieStore.remove('token');
        console.log("Status 401 or 400");
        $location.url('/login');
      }

      return $q.reject(response);
    };

    return promise.then(success, error);
  };
});
