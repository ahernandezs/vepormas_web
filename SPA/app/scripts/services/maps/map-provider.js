'use strict';

angular.module('spaApp').factory('mapProvider', ['$rootScope', 'mapService', '$q', function ($rootScope, mapService, $q) {

	return {

	    getMarkers: function(param){
			var deferred = $q.defer();
			mapService.getMarkers(param).success(function(data, status, headers) {
				$rootScope.markers = data.markers;
				deferred.resolve();
			}).error(function(data, status) {
				console.log(data, status);
				return deferred.reject("Error getting markers");
			});
			return deferred.promise;
	    },

	};

}]);
