'use strict';

angular.module('spaApp').factory('mapProvider', ['$rootScope', 'mapService', '$q', function ($rootScope, mapService, $q) {

	return {

	    getBranches: function(params){
			var deferred = $q.defer();
			mapService.getBranches(params).success(function(data, status, headers) {
//				var branches = [];
//				data.geolocations.forEach(function(branch){
//					branches.push({'latitude':branch.coordinates.lat,'longitude':branch.coordinates.lng,'title':branch.name,'id':branch.id})
//				})
//				$rootScope.branches = branches;
				$rootScope.branches = data.geolocations;
				deferred.resolve();
			}).error(function(data, status) {
				var result = {'response' : data, 'status': status};
		        //console.log(data, status);
		        return deferred.reject(result);
			});
			return deferred.promise;
	    },

	};

}]);
