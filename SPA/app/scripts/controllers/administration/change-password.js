'use strict';

angular.module('spaApp').controller('changePasswordController', ['$scope', 'adminProvider', function ($scope, adminProvider) {

	$scope.stage_password = 1;
	$scope.change = {};
	$scope.errorMessage = '';
	$scope.showError = false;
	$scope.resultChangePass = false;

	$scope.verifyNewPass = function () {
		if ( $scope.change.new !== $scope.change.repeatNew ){
			$scope.errorMessage = "Las contraseñas no coinciden";
			$scope.showError = true;
		}else{
			$scope.stage_password = 2;
		}
	};

	$scope.modifyPassword = function() {
		adminProvider.updatePassword($scope.change.old, $scope.change.new, $scope.change.otp).then(
			function(data){
				$scope.resultChangePass = true;
			},
			function(errorObject) {
				$scope.resultChangePass = false;
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
		$scope.stage_password = 3;
	};

}]);
