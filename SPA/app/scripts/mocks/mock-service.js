'use strict';

var mockModule = angular.module('spaApp');

mockModule.service('mockService', function($http) {
	this.checklogin = function () {
		return $http.get('/json/account.json');
	};
});
