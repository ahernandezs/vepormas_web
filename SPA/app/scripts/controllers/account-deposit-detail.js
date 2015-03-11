'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('AccountDepositDetailCtrl', ['$scope', '$location','$rootScope', 'accountsProvider', '$stateParams', function ($scope, $location, $rootScope,accountsProvider, $stateParams) {

	var params = {};
	params.numPage = 0;
	params.size = 100;

  	$scope.searchParams = {};

  	//initialize the account-detail
	accountsProvider.getAccountDetail($scope.selectedAcccountId).then(
		function(data) {
			$scope.accountDetail = $rootScope.accountDetail;
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

	//initialize the account's transactions-list
	accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
		function(data){
			$scope.accountTransactions = $rootScope.transactions;
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

	/**
	 * actualize the account transaction-list (search by date)
	 */
	$scope.getTransactions = function(date_start, date_end){
		params.date_end = date_end;
		params.date_start = date_start;
		accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
			function(data){
				$scope.accountTransactions = $rootScope.transactions;
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

	/**
	 * search transactions by date
	 */
	$scope.search = function() {
		if($scope.searchParams.date_start && $scope.searchParams.date_end) {
			$scope.getTransactions($scope.searchParams.date_start, $scope.searchParams.date_end);
		} else if($scope.searchParams.date_start === null && $scope.searchParams.date_end === null) {
			params.date_end = null;
			params.date_start = null;
			accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
			function(data){
				//WTF: why is there 'investment' transactions here?!?
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
			});
		}
	};

	/**
	 * get the statement list
	 */
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
