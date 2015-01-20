'use strict';

angular.module('spaApp')
.service('thirdAccountService', ['$http','$rootScope',function ($http, $rootScope) {
	this.getThirdAcounts = function(){
		return $http({
			url: $rootScope.restAPIBaseUrl+'/externalaccounts',
			method: 'GET',
			headers: {'Content-Type': 'application/json','X-AUTH-TOKEN': $http.defaults.headers.common['X-AUTH-TOKEN'] }
		});
	},

	this.registerThirdAccount = function(alias, beneficiaryName, e_mail, phone, accountNumber, otp){
		return $http({
			url: $rootScope.restAPIBaseUrl+'/externalaccounts',
			method: 'POST',
			data: JSON.stringify({
				'alias':alias,
				'beneficiary':{
					'beneficiary_name': beneficiaryName,
					'e_mail': e_mail,
					'phone': phone
				},
				'account_number':accountNumber,
				'otp':otp
			}),
			headers: {'Content-Type': 'application/json','X-AUTH-TOKEN': $http.defaults.headers.common['X-AUTH-TOKEN'] }
		});
	},

	this.unregisterThirdAccount = function(thirdAccountID,otp){
		return $http({
			url: $rootScope.restAPIBaseUrl+'/externalaccounts/'+thirdAccountID,
			method: 'DELETE',
			data: JSON.stringify({
				'otp':opt
			}),
			headers: {'Content-Type': 'application/json','X-AUTH-TOKEN': $http.defaults.headers.common['X-AUTH-TOKEN'] }
		});
	}
}]);
