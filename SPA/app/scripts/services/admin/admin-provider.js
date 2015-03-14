'use strict';

angular.module('spaApp').factory('adminProvider', ['$rootScope', 'adminService', '$q', function ($rootScope, adminService, $q) {

	return {

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
