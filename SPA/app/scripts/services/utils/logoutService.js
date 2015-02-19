'use strict';

angular.module('spaApp')
  .service('logoutService', ['$rootScope', function($rootScope) {
    
    var options = [];

    this.hasError = function() {
      return options.hasError;
    };

    this.setErrorMessage = function(message){
      options.hasError = true;
      options.message = message;
    };

    this.resetError = function(){
      options.hasError = false;
      options.message = null;
    }

    this.resetError();

  }]);
