'use strict';

angular.module('spaApp').factory('adminProvider', ['$rootScope', 'adminService', '$q', function ($rootScope, adminService, $q) {

	return {

	    getThirdAccounts: function () {

	      var deferred = $q.defer();

	      if(!$rootScope.thirdAccounts) {
	        console.log('getting third accounts');
	        adminService.getThirdAccounts().success(function(data, status, headers) {
	          $rootScope.third_accounts = data.third_accounts;
	          deferred.resolve();
	        }).error(function(data, status) {
	        	var result = {'response' : data, 'status': status};
		        console.log(data, status);
		        return deferred.reject(result);
	        });
	      } else {
	        deferred.resolve();
	      }

	      return deferred.promise;
	    },

	    deleteAccount: function(id, otp){
			var deferred = $q.defer();
			adminService.deleteAccount(id, otp).success(function(data, status, headers) {
				deferred.resolve();
			}).error(function(data, status) {
				var result = {'response' : data, 'status': status};
		        console.log(data, status);
		        return deferred.reject(result);
			});
			return deferred.promise;
	    },

	    updatePassword: function(current_pass, new_pass, otp){
			var deferred = $q.defer();
			adminService.updatePassword(current_pass, new_pass, otp).success(function(){
				deferred.resolve();
			}).error(function(data, status){
				var result = {'response' : data, 'status': status};
		        console.log(data, status);
		        return deferred.reject(result);
			})
			return deferred.promise;
	    },

		updateCommunication: function(phone, e_mail, otp) {
			var deferred = $q.defer();
			adminService.updateCommunication(phone, e_mail, otp).success(function(){
				deferred.resolve();
			}).error(function(data, status){
				return deferred.reject('Error updating communication information');
			});
			return deferred.promise;
		}

	};

}]);
