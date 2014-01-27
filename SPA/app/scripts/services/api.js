'use strict';

/**
 * the user information service. use to save in global scope the user pieces of information
 */
angular.module('spaApp').service('userInformationService', function() {
	var userInformation;
	var userSessionId;

	this.setUserInformation = function(newObj) {
		userInformation=newObj;
	};

	this.getUserInformation = function(){
		return userInformation;
	};

	this.setUserSessionId = function(newObj) {
		userSessionId=newObj;
	};

	this.getUserSessionId = function(){
		return userSessionId;
	};
});