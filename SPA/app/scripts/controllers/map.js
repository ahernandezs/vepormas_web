'use strict';

angular.module('spaApp').controller('MapCtrl', ['$scope', '$rootScope', 'mapProvider', function ($scope,  $rootScope, mapProvider) {

	$scope.map = { center: { latitude: 19.3888201, longitude: -99.1930411 }, zoom: 15 };

	mapProvider.getMarkers({}).then(
		function(data) {
			$scope.map.markers = $rootScope.markers;
		}
	);

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			$scope.map.center = {
									latitude: position.coords.latitude,
									longitude: position.coords.longitude
								};
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
	}

}]);
