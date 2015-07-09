'use strict';

angular.module('spaApp').factory('securityTokenProvider', ['securityTokenService', '$q', function (securityTokenService, $q) {

	return {

		getUserSecurityTokenState: function(otp1, otp2){
			var deferred = $q.defer();
			securityTokenService.getUserSecurityTokenState().success(function(data){
				deferred.resolve(data);
			}).error(function(data, status){
				var result = {'response' : data, 'status': status};
		        //console.log(data, status);
		        return deferred.reject(result);
			})
			return deferred.promise;
	    },

		synchronizeSecurityToken: function(otp1, otp2){
			var deferred = $q.defer();
			securityTokenService.synchronizeSecurityToken(otp1, otp2).success(function(){
				deferred.resolve();
			}).error(function(data, status){
				var result = {'response' : data, 'status': status};
		        //console.log(data, status);
		        return deferred.reject(result);
			})
			return deferred.promise;
	    },


	    activateSecurityToken: function(tokenId, otp1, otp2){
			var deferred = $q.defer();
			securityTokenService.activateSecurityToken(tokenId, otp1, otp2).success(function(){
				deferred.resolve();
			}).error(function(data, status){
				var result = {'response' : data, 'status': status};
		        //console.log(data, status);
		        return deferred.reject(result);
			})
			return deferred.promise;
	    },

	    disableSecurityToken: function(code){
			var deferred = $q.defer();
			securityTokenService.disableSecurityToken(code).success(function(){
				deferred.resolve();
			}).error(function(data, status){
				var result = {'response' : data, 'status': status};
		        //console.log(data, status);
		        return deferred.reject(result);
			})
			return deferred.promise;
	    },


	    enableSecurityToken: function(tokenId, otp1, otp2){
			var deferred = $q.defer();
			securityTokenService.enableSecurityToken().success(function(){
				deferred.resolve();
			}).error(function(data, status){
				var result = {'response' : data, 'status': status};
		        //console.log(data, status);
		        return deferred.reject(result);
			})
			return deferred.promise;
	    }
	};

}]);
