'use strict';

angular.module('spaApp')
  .service('logoutService', ['$rootScope', function($rootScope) {
    
    var options = [];

    this.hasError = function() {
      return options.hasError;
    };

    this.displayErrorMessage = function(){
      options.hasError = true;
    };

    this.resetError = function(){
      options.hasError = false;
      options.message = null;
    }

    this.resetError();

  }]);
