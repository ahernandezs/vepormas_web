'use strict';

/**
 * The credit card controller.
 */
angular.module('spaApp').controller('creditCtrl', ['$scope', '$location', '$stateParams', 'accountsProvider', '$rootScope', function ($scope, $location, $stateParams, accountsProvider, $rootScope) {

	var params = {};
	params.numPage = 0;
	params.size = 100;

  $scope.searchParams = {};

	accountsProvider.getAccountDetail($scope.selectedAcccountId).then(
		function(data) {
			$scope.creditsHeader = $rootScope.accountDetail;
		},
		function(errorObject) {
			var status = errorObject.status;
	        if(status === 406){
	            $scope.setServiceError('datos inválidos');
	        }else if(status === 500){
	            var message = errorObject.response.message;
	            $scope.setServiceError(message);
	        }else{
	            $scope.setServiceError('Error en el servicio, intente más tarde');
	        }
		}
	);

	accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
		function(data){
			$scope.creditTransactions = $rootScope.transactions;
		},
		function(errorObject) {
			var status = errorObject.status;
	        if(status === 406){
	            $scope.setServiceError('datos inválidos');
	        }else if(status === 500){
	            var message = errorObject.response.message;
	            $scope.setServiceError(message);
	        }else{
	            $scope.setServiceError('Error en el servicio, intente más tarde');
	        }
		}
	);

	$scope.getTransactions = function(date_start, date_end){
		params.date_end = date_end;
		params.date_start = date_start;
		accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
			function(data){
				$scope.creditTransactions = $rootScope.transactions;
			},
			function(errorObject) {
				var status = errorObject.status;
		        if(status === 406){
		            $scope.setServiceError('datos inválidos');
		        }else if(status === 500){
		            var message = errorObject.response.message;
		            $scope.setServiceError(message);
		        }else{
		            $scope.setServiceError('Error en el servicio, intente más tarde');
		        }
			}
		);
	}

  $scope.search = function() {
    if($scope.searchParams.date_start && $scope.searchParams.date_end) {
    	$scope.getTransactions($scope.searchParams.date_start, $scope.searchParams.date_end);
    } else if($scope.searchParams.date_start === null && $scope.searchParams.date_end === null) {
		params.date_end = null;
		params.date_start = null;
		accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
			function(data){
			    $scope.investmentTransactions = $rootScope.transactions;
			},
			function(errorObject) {
				var status = errorObject.status;
		        if(status === 406){
		            $scope.setServiceError('datos inválidos');
		        }else if(status === 500){
		            var message = errorObject.response.message;
		            $scope.setServiceError(message);
		        }else{
		            $scope.setServiceError('Error en el servicio, intente más tarde');
		        }
			}
		);
	}
  };

	$scope.getStatements = function(){
		$scope.showStatement = true;
		accountsProvider.getStates($stateParams.accountId).then(
			function(data) {
				$scope.statements = $rootScope.statements;
			},
			function(errorObject) {
				var status = errorObject.status;
		        if(status === 406){
		            $scope.setServiceError('datos inválidos');
		        }else if(status === 500){
		            var message = errorObject.response.message;
		            $scope.setServiceError(message);
		        }else{
		            $scope.setServiceError('Error en el servicio, intente más tarde');
		        }
			}
		);
	};

}]);
