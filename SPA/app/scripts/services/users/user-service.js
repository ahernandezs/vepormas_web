'use strict';

angular.module('spaApp')
  .service('userService', ['$http','$rootScope',function ($http, $rootScope) {
	this.getUser = function(clientOrAccount, Folio){
		return $http({
				url: $rootScope.restAPIBaseUrl+'/preregister',
				method: 'POST',
				data: JSON.stringify({
					'client_id':clientOrAccount,
					'folio_id':Folio,
                    'client_application_id': 'PROSA-DIG'
				}),
				headers: {'Content-Type': 'application/json'}
		});
	}

	this.setUser = function(identifier, imageId, password, email, cellPhone){
		return $http({
				url: $rootScope.restAPIBaseUrl+'/register',
				method: 'POST',
				data: JSON.stringify({
					'identifier': identifier,
					'image_id':imageId,
					'password':password,
					'e_mail':email,
					'phone': cellPhone
				}),
				headers: {'X-REGISTER-TOKEN': $rootScope.registerToken}
		});
	}

	this.logout = function(){
		return $http({
			url: $rootScope.restAPIBaseUrl+'/logout',
			method: 'GET'
		});
	}

}]);
