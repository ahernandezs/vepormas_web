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
	          console.log(data, status);
	          return deferred.reject("Error getting third accounts");
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
				console.log(data, status);
				return deferred.reject("Error deleting accounts");
			});
			return deferred.promise;
	    },

	    updatePassword: function(current_pass, new_pass){
			var deferred = $q.defer();
			adminService.updatePassword(current_pass, new_pass).success(function(){
				deffered.resolve();
			}).error(fucntion(data, status){
				return deferred.reject("Error changing password");
			})
			return deferred.promise;
	    }

	};

}]);
