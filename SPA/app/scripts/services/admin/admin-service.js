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
			headers: {'Content-Type': 'application/json','X-AUTH-TOKEN': $http.defaults.headers.common['X-AUTH-TOKEN'] }
		});
	};

	this.updatePassword = function(current_pass, new_pass, otp){
		return $http({
			url: $rootScope.restAPIBaseUrl+'/userInformation/password',
			method: 'PUT',
			data: JSON.stringify({
				"current": current_pass,
				"password": new_pass,
				"otp": otp
			}),
			headers: {'Content-Type': 'application/json','X-AUTH-TOKEN': $http.defaults.headers.common['X-AUTH-TOKEN'] }
		});
	}

}]);
