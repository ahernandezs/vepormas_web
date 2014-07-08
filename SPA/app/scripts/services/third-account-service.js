'use strict';

angular.module('spaApp')
  .service('thirdAccountService', ['$http',function ($http) {
	this.getThirdAcounts = function(){
		//return $http.get($rootScope.restAPIBaseUrl+'/externalaccounts');
		return $http.get('/scripts/services/third-account-beneficiaries-JSON.js');	
	},

	this.setBeneficiary = function(name, clabe, amount, email, phone){
		return $http({
				//url: $rootScope.restAPIBaseUrl+'/externalaccounts',
				url:'/scripts/services/third-account-beneficiaries-JSON.js',
				method: 'POST',
				data: JSON.stringify({
					'name':name,
					'clabe':clabe,
					'amount':amount,
					'email':email,
					'phone':phone
				}),
				headers: {'Content-Type': 'application/json','X-BANK-TOKEN': '1'}
		});
	}
}]);
