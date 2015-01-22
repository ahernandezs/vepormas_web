'use strict';

angular.module('spaApp').service('adminService', ['$http','$rootScope', function ($http, $rootScope) {

	this.getThirdAccounts = function () {
		return $http.get($rootScope.restAPIBaseUrl+'/externalaccounts');
	};

}]);
