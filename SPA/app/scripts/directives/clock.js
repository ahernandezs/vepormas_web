'use strict';

angular.module('spaApp')
  .directive('clock', ['$interval', 'dateFilter', function($interval, dateFilter) {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/clock.html',
      link: function(scope, element, attrs) {
        var format, timeoutId;
        var days = ['Doming', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre'];

        function updateTime() {

          //traer esta fecha del servidor
          var fecha = new Date();

          scope.dia_semana = days[fecha.getDay()];
          scope.dia = fecha.getDate();
          scope.mes = months[fecha.getMonth()];
          scope.ano = fecha.getFullYear();
          scope.hora = dateFilter(fecha, 'h:mm:ss');
          scope.lugar_acceso = 'Bancanet';
          scope.fecha_acceso = '23/06/1978 a las 21:12:59';
        }

        element.on('$destroy', function() {
          $interval.cancel(timeoutId);
        });

        timeoutId = $interval(function() {
          updateTime();
        }, 1000);
    }};
}]);
