'use strict';

angular.module('spaApp').controller('MapCtrl', ['$scope', '$rootScope', 'mapProvider', function ($scope,  $rootScope, mapProvider) {

	$scope.map = { center: { latitude: 19.3888201, longitude: -99.1930411 }, zoom: 15 };
	var geocoder = new google.maps.Geocoder();

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

	function codeAddress(address) {
	  geocoder.geocode( { 'address': address}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	      //map.setCenter(results[0].geometry.location);
	      /*var marker = new google.maps.Marker({
	          map: map,
	          position: results[0].geometry.location
	      });*/
			console.log('Resultado de la busqueda: '+JSON.stringify(results));
	    } else {
	      alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
	}

}]);
