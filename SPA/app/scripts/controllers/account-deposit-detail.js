'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
 angular.module('spaApp').controller('AccountDepositDetailCtrl', ['$scope', '$location','$rootScope', 'accountsProvider', '$stateParams', '$http', function ($scope, $location, $rootScope,accountsProvider, $stateParams, $http) {

	var params = {};
	params.numPage = 0;
	params.size = 100;
	$scope.years = [
		{ label: '2014', value: 2014 },
		{ label: '2013', value: 2013 },
		{ label: '2012', value: 2012 }
	];
	$scope.months = [
		{ label: 'Enero', value: 1 },
		{ label: 'Febrero', value: 2 },
		{ label: 'Marzo', value: 3 },
		{ label: 'Abril', value: 4 },
		{ label: 'Mayo', value: 5 },
		{ label: 'Junio', value: 6 },
		{ label: 'Julio', value: 7 },
		{ label: 'Agosto', value: 8 },
		{ label: 'Septiembre', value: 9 },
		{ label: 'Octubre', value: 10 },
		{ label: 'Noviembre', value: 11 },
		{ label: 'Diciembre', value: 12 }
	];
	$scope.year = $scope.years[0];

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

	$scope.getStatement = function(id, format){
		$http.get($rootScope.restAPIBaseUrl+'/files/statement?format='+format.toUpperCase()+'&id='+id+'&_account_id='+$stateParams.accountId, {responseType: 'arraybuffer'})
			.success(function (data) {
			var file = new Blob([data], {type: 'application/'+format});
			var fileURL = URL.createObjectURL(file);
			window.open(fileURL);
		});
	}

}]);
