'use strict';

angular.module('spaApp')
  .service('registerService', ['$http','$rootScope',function ($http, $rootScope) {
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
