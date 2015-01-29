'use strict';

angular.module('spaApp').service('adminService', ['$http','$rootScope', function ($http, $rootScope) {

	this.getThirdAccounts = function () {
		return $http.get($rootScope.restAPIBaseUrl+'/externalaccounts');
	};

	this.deleteAccount = function(id, otp){
		return $http({
			url: $rootScope.restAPIBaseUrl+'/externalaccounts/'+id,
			method: 'delete',
			data: JSON.stringify({
				'otp':otp
			}),
		});
	};

}]);
