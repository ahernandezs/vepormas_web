'use strict';

angular.module('spaApp')
  .service('userService', ['$http','$rootScope',function ($http, $rootScope) {
	this.preRegisterUser = function(clientId, folioId){
		return $http({
				url: $rootScope.restAPIBaseUrl+'/preregister',
				method: 'POST',
				data: JSON.stringify({
					'client_id': clientId,
					'folio_id': folioId,
                    'client_application_id': 'PROSA-DIG'
				}),
				headers: {'Content-Type': 'application/json'}
		});
	}

	this.registerUser = function(registrationToken, params){
		return $http({
				url: $rootScope.restAPIBaseUrl+'/register',
				method: 'POST',
				data: JSON.stringify(params),
				headers: {'X-REGISTER-TOKEN': registrationToken}
		});
	}

	this.logout = function(){
		return $http({
			url: $rootScope.restAPIBaseUrl+'/logout',
			method: 'GET'
		});
	}

}]);
