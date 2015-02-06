'use strict';

angular.module('spaApp').controller('MapCtrl', ['$scope', function ($scope) {

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			$scope.map = { center: { latitude: position.coords.latitude, longitude: position.coords.longitude }, zoom: 8 };
		}, function() {
			handleNoGeolocation(true);
		});
	} else {
		handleNoGeolocation(false);
	}

	function handleNoGeolocation(errorFlag) {
		if (errorFlag) {
			var content = 'Error: The Geolocation service failed.';
		} else {
			var content = 'Error: Your browser doesn\'t support geolocation.';
		}
		$scope.map = { center: { latitude: 19.3888201, longitude: -99.1930411 }, zoom: 8 };
	}

}]);
