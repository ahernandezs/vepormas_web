'use strict';

angular.module('spaApp').controller('MapCtrl', ['$scope', function ($scope) {

	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

}]);
