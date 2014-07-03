'use strict';

angular.module('spaApp')
  .service('thirdAccountService', ['$http',function ($http) {
	this.getThirdAcounts = function(){
		//return $http.get($rootScope.restAPIBaseUrl+'/externalaccounts');
		return $http.get('/scripts/services/third-account-beneficiaries-JSON.js');	
	};
}]);
