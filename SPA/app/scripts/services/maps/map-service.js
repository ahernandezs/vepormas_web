'use strict';

angular.module('spaApp').service('mapService', ['$http','$rootScope', function ($http, $rootScope) {

	this.getMarkers = function(param){
		return $http({
			//url: $rootScope.restAPIBaseUrl+'/sucursales',
			url: '/sucursales.json',
			method: 'get',
			data: JSON.stringify({
				'param':param
			}),
		});
	};

}]);
