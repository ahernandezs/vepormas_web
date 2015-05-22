'use strict';

angular.module('spaApp').controller('updateServicesController', ['$scope', 'adminProvider', function ($scope, adminProvider) {

	$scope.actionUpdateState = 1;
	$scope.updateDigitalBankServiceState = [];

	$scope.updateService = function(action, state){
		$scope.actionUpdateState = action;
		$scope.updateDigitalBankServiceState.state = state;
		if(action == 1){
			$scope.updateDigitalBankServiceState.otp = '';
		}
	}

	$scope.updateDigitalBankServiceState = function(){
		adminProvider.updateDigitalBankServiceState($scope.updateDigitalBankServiceState.state, $scope.updateDigitalBankServiceState.otp).then(
			function(data){
				$scope.exception = false;
				$scope.actionUpdateState = 3;
				$scope.updateDigitalBankServiceState.otp = '';
				$scope.message = "La información se actualizó correctamente.";
			},
			function(errorObject){
				$scope.exception = true;
				$scope.actionUpdateState = 3;
				$scope.updateDigitalBankServiceState.otp = '';
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
	}

}]);
