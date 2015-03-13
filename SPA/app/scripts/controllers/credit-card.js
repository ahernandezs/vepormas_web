'use strict';

/**
 * The credit card controller.
 */
angular.module('spaApp').controller('creditCardCtrl', ['$scope', '$location', '$stateParams', 'accountsProvider', '$rootScope', '$http','paymentCreditCardService', function ($scope, $location, $stateParams, accountsProvider, $rootScope, $http, paymentCreditCardService) {

	var params = {};
	params.numPage = 0;
	params.size = 100;
	$scope.showStatement = false;
	$scope.previousPeriod = false;
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

	accountsProvider.getAccountDetail($stateParams.accountId).then(
		function(data) {
			$scope.creditsHeader = $rootScope.accountDetail.credit_card;
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
			$scope.creditCardTransactions = $rootScope.transactions;
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

	$scope.back = function(){
		$scope.showStatement = false;
	};

	$scope.getTransactions = function(previousPeriod){
		if($scope.previousPeriod !== previousPeriod) {
			$scope.previousPeriod = previousPeriod;
			params.previousPeriod = previousPeriod;
			accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
				function(data){
					$scope.creditCardTransactions = $rootScope.transactions;
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

	/**
	Function for invoke payment flow  and set navigation bar .
	**/
	$scope.doPaymentFlow = function(type,minPayment){
		$scope.selectNavigatOption('transfers');
        paymentCreditCardService.prepForShared({ accountId:$stateParams.accountId , amount:minPayment, paymentType: type  });
	};
}]);

	/**
	* Service for share information between controllers .
	**/
	angular.module('spaApp').factory('paymentCreditCardService', function() {
	    var account = {};
	    account.accountId;
	    account.amount;
	    account.paymentType;

	    account.prepForShared = function(msg) {
	        this.accountId = msg.accountId;
	        this.amount = msg.amount;
	        this.paymentType = msg.paymentType;
	    };

	    return account;
	});
