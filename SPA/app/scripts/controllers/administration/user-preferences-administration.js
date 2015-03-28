'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('UserPreferencesAdministrationController', ['$scope', 'securityTokenProvider', function ($scope, securityTokenProvider) {

	/**
	 * the security-token's state
	 */
	var tokenState;

	//by default, we go on the change password, cancel digital-bank, change phone-number/email page
	$scope.userAdministrationStep = 1;
 	/**
 	 * goto to the user-preference configuration page
 	 */
	$scope.gotoUserPreferencesPage = function(){
		$scope.userAdministrationStep = 1;
	};

	/**
 	 * check if the user is on the user-preference configuration page
 	 */
	$scope.isUserPreferencesAdministrationPageActivated = function(){
		return $scope.userAdministrationStep == 1;
	};

	/**
 	 * goto to the security-token configuration page
 	 */
	$scope.gotoTokenAdministrationPage = function(){
		resetTokenActivationData();
		resetTokenSynchronizationData();
		securityTokenProvider.getUserSecurityTokenState().then(
			function(data){
				tokenState = data.security_token_state;
				$scope.userAdministrationStep = 2;
			},
			function(data){
				$scope.setServiceError('Error en el servicio, intente más tarde');
			}
		);
	};

	/**
	 * return true if the user's security-toke state is NEW
	 */
	$scope.isSecurityTokenNew= function(){
		return tokenState == 0;
	};

	/**
	 * return true if the user's security-toke state is ENABLED
	 */
	$scope.isSecurityTokenEnabled= function(){
		return tokenState == 1;
	};

	/**
 	 * check if the user is on the security-token configuration page
 	 */
	$scope.isUserTokenAdministrationPageActivated = function(){
		return $scope.userAdministrationStep == 2;
	};

	/**
 	 * activate the user's security-token
 	 */
	$scope.activateSecurityToken = function(){
		securityTokenProvider.activateSecurityToken($scope.tokenActivationData.tokenId, 
													$scope.tokenActivationData.otp1, 
													$scope.tokenActivationData.otp2).then(
			function(data){
				$scope.setServiceError('Su token ha sido activado');
				resetTokenActivationData();
			},
			function(data){
				$scope.setServiceError('Su se pudo activar su token');
				resetTokenActivationData();
			}
		);
	};

	/**
	 * reset the values input by the user for the token activation
	 */
	function resetTokenActivationData(){
		$scope.tokenActivationData = {};
	}


	/**
 	 * synchronize the user's security-token
 	 */
	$scope.synchronizeSecurityToken = function(){
		securityTokenProvider.synchronizeSecurityToken($scope.tokenSynchronizationData.otp1, 
													$scope.tokenSynchronizationData.otp2).then(
			function(data){
				$scope.setServiceError('Su token ha sido sincronizado');
				resetTokenSynchronizationData();
			},
			function(data){
				$scope.setServiceError('Su se pudo sincronizar su token');
				resetTokenSynchronizationData();
			}
		);
		
	};

	/**
	 * reset the values input by the user for the token synchronization
	 */
	function resetTokenSynchronizationData(){
		$scope.tokenSynchronizationData = {};
	}
	
}]);
