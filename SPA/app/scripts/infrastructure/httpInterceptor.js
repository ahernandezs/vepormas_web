'use strict';

angular.module('spaApp').factory('httpInterceptor', ['$q', '$window', '$location', '$rootScope', 'timerService',
    function httpInterceptor ($q, $window, $location, $rootScope, timerService) {
  return {
    'request': function (request) {
      if($rootScope.session_token) {
        $rootScope.requestInProcess = true;
        console.log("Is request in process ...");
      }

      return request;
    },
    'response': function (response) {
      if($rootScope.session_token) {
        timerService.reset();
        $rootScope.requestInProcess = false;
      }
      return response;
    },

    'responseError': function (response) {
      // TODO: Seems that in some time we don't get response.status
      console.log(response);

      $rootScope.requestInProcess = false;

      if (!response.status) {
        console.log("Response undefined");
        $location.url('/login');
      }

      if (response.status === 401) {
        console.log("Status 401");

        timerService.setTimeout(true);

        $rootScope.session_token = null;
        if($window.x_session_token) {
          $window.x_session_token = null;
          $window.location.href = "login";
        } else {
          $location.url('/login');
        }
      }

      return $q.reject(response);
    }

  };

}]);
