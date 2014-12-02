'use strict';

angular.module('spaApp')
  .service('userService', ['$http','$rootScope',function ($http, $rootScope) {
	this.getUser = function(clientOrAccount, Folio){
		return $http({
				url: $rootScope.restAPIBaseUrl+'/preregister',
				method: 'POST',
				data: JSON.stringify({
					'applicationId':clientOrAccount,
					'digitalBankId':Folio
				})
		});
	}

	this.setUser = function(applicationId, digitalBankId, bankUserName, identifier, password , email, cellPhone, imageId, imageGroupId ,cardId ,customerId ){
		return $http({
				url: $rootScope.restAPIBaseUrl+'/register',
				method: 'POST',
				data: JSON.stringify({
					'applicationId':applicationId,
					'digitalBankId':digitalBankId,
					'bankUserName':bankUserName,
					'identifier':identifier,
					'phone':phone,
					'password': password,
					'email': email,
					'cellPhone' : cellPhone ,
					'imageId': imageId ,
					'imageGroupId' : imageGroupId ,
					'cardId' : cardId ,
					'customerId' : customerId
				})
		});
	}
}]);
