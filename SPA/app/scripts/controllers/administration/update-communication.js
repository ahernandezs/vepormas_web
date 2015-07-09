'use strict';

angular.module('spaApp').controller('updateCommunicationController', ['$scope', 'adminProvider', function ($scope, adminProvider) {

	$scope.stage_updatecommunication = 1;

	$scope.validateEmail = function () {
		$scope.stage_updatecommunication = 2;
	};

	$scope.goBack = function () {
		$scope.updatedata = {};
		$scope.stage_updatecommunication = 1;
	};

	$scope.resetUpdateData = function () {
		$scope.updatedata = {};
		$scope.goBack();
	};

	$scope.sendCommunication = function () {
		adminProvider.updateCommunication($scope.updatedata.phone, $scope.updatedata.e_mail, $scope.updatedata.otp).then(
			function (data) {
				$scope.stage_updatecommunication = 3;
			},
			function(errorObject) {
				var status = errorObject.status;
		        if(status === 403){
					$scope.manageOtpErrorMessage(errorObject.response);
			    } else {
			    	var msg = codeStatusErrors.errorMessage(status);
					if (status === 500){
		            	$scope.setServiceError(msg + errorObject.response.message);
		        	} else {
		        		$scope.setServiceError(msg);
		        	}
			    }
			}
		);
	};

}]);
