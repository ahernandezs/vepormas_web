'use strict';

angular.module('spaApp').factory('mapProvider', ['$rootScope', 'mapService', '$q', function ($rootScope, mapService, $q) {

	return {

	    getBranches: function(params){
			var deferred = $q.defer();
			mapService.getBranches(params).success(function(data, status, headers) {
				var branches = [];
				data.geolocations.forEach(function(branch){
					branches.push({'latitude':branch.coordinates.lat,'longitude':branch.coordinates.lng,'title':branch.name,'id':branch.id})
				})
				$rootScope.branches = branches;
				deferred.resolve();
			}).error(function(data, status) {
				console.log(data, status);
				 var data = {'response' : data, 'status': status};
				return deferred.reject(data);
			});
			return deferred.promise;
	    },

	};

}]);
