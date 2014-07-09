'use strict';

angular.module('spaApp')
  .directive('timeAccess', ['$interval', 'dateFilter', function($interval, dateFilter) {
    return {
      scope: {
        media: '@',
        date: '@'
      },
      restrict: 'E',
      templateUrl: 'views/directives/time-access.html',
      link: function(scope, element, attrs) {
        var format, timeoutId;
        
        function updateTime() {

          //get this date from server
          var date = new Date();

          scope.last_access_media = scope.media;
          scope.last_access_date = dateFilter(new Date(parseInt(scope.date)), 'dd/MM/yyyy hh:mm:ss');
          scope.week_day = dateFilter(date.getDay(),'EEEE');
          scope.day = date.getDate();
          scope.month = dateFilter(date.getMonth(),'MMMM');
          scope.year = date.getFullYear();
          scope.hour = dateFilter(date, 'h:mm:ss');
        }

        element.on('$destroy', function() {
          $interval.cancel(timeoutId);
        });

        timeoutId = $interval(function() {
          updateTime();
        }, 1000);

        updateTime();
    }};
}]);
