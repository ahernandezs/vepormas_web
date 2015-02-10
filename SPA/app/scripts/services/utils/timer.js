'use strict';

angular.module('spaApp')
  .service('timerService', ['$rootScope', '$interval', function($rootScope, $interval) {
    var options = {
      idle: 240,
      warning: 30,
      idleTimer: null,
      warningTimer: null,
      isTimeout: false
    };

    this.idleDuration = function(value) {
      options.idle = value;
    };

    this.warningDuration = function(value) {
      options.warning = value;
    };

    this.start = function() {
      options.idleTimer = $interval(idleTimeout, options.idle * 1000);
      options.isTimeout = false;
    };

    this.reset = function() {
      if(options.idleTimer) {
        if(options.warningTimer) $interval.cancel(options.warningTimer);
        $interval.cancel(options.idleTimer);
        options.idleTimer = $interval(idleTimeout, options.idle * 1000);
        $rootScope.$broadcast('IdleReset');
      }
    };

    this.stop = function() {
      if(options.idleTimer) {
        $interval.cancel(options.idleTimer);
      }
      if(options.warningTimer) {
        $interval.cancel(options.warningTimer);
      }
    };

    this.isTimeout = function() {
      return options.isTimeout;
    };

    this.setTimeout = function(value) {
      options.isTimeout = value;
    };

    function idleTimeout() {
      $interval.cancel(options.idleTimer);
      $rootScope.$broadcast('IdleTimeout');

      options.warningTimer = $interval(warningTimeout, options.warning * 1000);
    }

    function warningTimeout() {
      $interval.cancel(options.warningTimer);
      $rootScope.$broadcast('WarningTimeout');
      options.isTimeout = true;
    }
  }]);
