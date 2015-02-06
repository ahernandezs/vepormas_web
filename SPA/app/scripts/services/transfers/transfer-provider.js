
'use strict';

/**
 * api initializer factory
 */

angular.module('spaApp').factory('transferProvider', ['$rootScope', 'transferService', '$q', function ($rootScope, transferService, $q) {
	return {
    	transferToOwnAccount: function (sourceAccount, destinationAccount, amount, description) {
      		var deferred = $q.defer();
      		console.log('transfer to own-account');
        	transferService.transferToOwnAccount(sourceAccount, destinationAccount, amount, description).success(
    			function(data, status, headers) {
      				deferred.resolve(data);
    		}).error(
    			function(data, status) {
      				console.log("Error transferring to own-account", data, status);
      				var result = {'data' : data, 'status': status};
      				return deferred.reject(result);
    			}
    		);
      		return deferred.promise;
    	},
		
		transferThirdAccountSameBank: function (sourceAccount, destinationAccount, amount, description, otp) {
      		var deferred = $q.defer();
      		console.log('transfer to third-account');
        	transferService.transferThirdAccountSameBank().success(
    			function(data, status, headers) {
      				deferred.resolve(data);
    		}).error(
    			function(data, status) {
      				console.log("Error transferring to third-account same bank", data, status);
      				var result = {'data' : data, 'status': status};
      				return deferred.reject(result);
    			}
    		);
      		return deferred.promise;
    	},

    	transferThirdAccountOtherBank: function (sourceAccount, destinationAccount, amount, description, otp, referenceNumber, postTomorrow) {
      		var deferred = $q.defer();
      		console.log('transfer to third-account');
        	transferService.transferThirdAccountOtherBank().success(
    			function(data, status, headers) {
      				deferred.resolve(data);
    		}).error(
    			function(data, status) {
      				console.log("Error transferring to third-account other-bank", data, status);
      				var result = {'data' : data, 'status': status};
      				return deferred.reject(result);
    			}
    		);
      		return deferred.promise;
    	},

    	payOwnCard: function (sourceAccount, cardAccount, amount, description, date) {
      		var deferred = $q.defer();
      		console.log('pay own credit-card account');
        	transferService.payOwnCard(sourceAccount, cardAccount, amount, description, date).success(
    			function(data, status, headers) {
      				deferred.resolve(data);
    		}).error(
    			function(data, status) {
      				console.log("Error transferring to own credit-card account", data, status);
      				var result = {'data' : data, 'status': status};
      				return deferred.reject(result);
    			}
    		);
      		return deferred.promise;
    	},

    	payThirdCard: function (sourceAccount, cardAccount, amount, description, date, otp) {
      		var deferred = $q.defer();
      		console.log('pay third credit-card account');
        	transferService.payThirdCard(sourceAccount, cardAccount, amount, description, date, otp).success(
    			function(data, status, headers) {
      				deferred.resolve(data);
    		}).error(
    			function(data, status) {
      				console.log("Error transferring to third credit-card account", data, status);
      				var result = {'data' : data, 'status': status};
      				return deferred.reject(result);
    			}
    		);
      		return deferred.promise;
    	},

    	investVista: function (sourceAccount, destinationVistaAccount, amount) {
      		var deferred = $q.defer();
      		console.log('invest to own VISTA investment-account');
        	transferService.investVista(sourceAccount, destinationVistaAccount, amount).success(
    			function(data, status, headers) {
      				deferred.resolve(data);
    		}).error(
    			function(data, status) {
      				console.log("Error transferring to VISTA own-investment-account", data, status);
      				var result = {'data' : data, 'status': status};
      				return deferred.reject(result);
    			}
    		);
      		return deferred.promise;
    	},

    	retireVista: function (sourceVistaAccount, destinationAccount, amount) {
      		var deferred = $q.defer();
      		console.log('retire from VISTA investment-account');
        	transferService.retireVista(sourceVistaAccount, destinationAccount, amount).success(
    			function(data, status, headers) {
      				deferred.resolve(data);
    		}).error(
    			function(data, status) {
      				console.log("Error transferring from VISTA own-investment-account", data, status);
      				var result = {'data' : data, 'status': status};
      				return deferred.reject(result);
    			}
    		);
      		return deferred.promise;
    	},

    	investCEDE: function (sourceAccount, productId, amount, investAgain) {
      		var deferred = $q.defer();
      		console.log('invest into a new CEDE product');
        	transferService.investCEDE(sourceAccount, productId, amount, investAgain).success(
    			function(data, status, headers) {
      				deferred.resolve(data);
    		}).error(
    			function(data, status) {
      				console.log("Error investing into a CEDE product", data, status);
      				var result = {'data' : data, 'status': status};
      				return deferred.reject(result);
    			}
    		);
      		return deferred.promise;
    	},

    	investPRLV: function (sourceAccount, productId, amount, investAgain) {
      		var deferred = $q.defer();
      		console.log('invest into a new PRLV product');
        	transferService.investPRLV(sourceAccount, productId, amount, investAgain).success(
    			function(data, status, headers) {
      				deferred.resolve(data);
    		}).error(
    			function(data, status) {
      				console.log("Error investing into a PRLV product", data, status);
      				var result = {'data' : data, 'status': status};
      				return deferred.reject(result);
    			}
    		);
      		return deferred.promise;
    	},
	};
}]);