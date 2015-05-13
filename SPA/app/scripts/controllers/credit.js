'use strict';

/**
 * The credit card controller.
 */
angular.module('spaApp').controller('creditCtrl', ['$scope', '$location', '$stateParams', 'accountsProvider', '$rootScope', '$http', 'codeStatusErrors', function ($scope, $location, $stateParams, accountsProvider, $rootScope, $http, codeStatusErrors) {

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
	$scope.searchMessage = 'false';

	accountsProvider.getAccountDetail($scope.selectedAcccountId).then(
		function(data) {
			$scope.creditsHeader = $rootScope.accountDetail;
		},
		function(errorObject) {
			var status = errorObject.status;
	        var msg = codeStatusErrors.errorMessage(status);
			if (status === 500){
            	$scope.setServiceError(msg + errorObject.response.message);
        	} else {
        		$scope.setServiceError(msg);
        	}
		}
	);

	accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
		function(data){
			$scope.creditTransactions = $rootScope.transactions;
		},
		function(errorObject) {
			var status = errorObject.status;
	        var msg = codeStatusErrors.errorMessage(status);
			if (status === 500){
            	$scope.setServiceError(msg + errorObject.response.message);
        	} else {
        		$scope.setServiceError(msg);
        	}
		}
	);

	$scope.getTransactions = function(date_start, date_end){
		params.date_end = date_end;
		params.date_start = date_start;
		accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
			function(data){
				$scope.creditTransactions = $rootScope.transactions;
				$scope.searchMessage = 'true';
			},
			function(errorObject) {
				var status = errorObject.status;
		        var msg = codeStatusErrors.errorMessage(status);
				if (status === 500){
	            	$scope.setServiceError(msg + errorObject.response.message);
	        	} else {
	        		$scope.setServiceError(msg);
	        	}
			}
		);
	};

	/**
     * Hide the search message.
     */
    $scope.clearMessage = function() {
        $scope.searchMessage = 'false';
    };

  $scope.search = function() {
    var todaysDate = new Date();
    var dd = todaysDate.getDate();      // day
    var mm = todaysDate.getMonth()+1;   // month (January is 0!)
    var yy = todaysDate.getFullYear();  // year
    dd = dd < 10 ? '0' + dd : dd; 
    mm = mm < 10 ? '0' + mm : mm;
    todaysDate = yy+mm+dd;
    // startDate pass from String to Int
    var startDate = parseInt($scope.searchParams.date_start.split("/").reverse().join("")); 
    // endDate pass from String to Int
    var endDate = parseInt($scope.searchParams.date_end.split("/").reverse().join("")); 

    if($scope.searchParams.date_start && $scope.searchParams.date_end) {
        if (startDate > todaysDate || endDate > todaysDate){
        	console.log('\t\t\tBúsqueda no realizada');
        	$scope.setServiceError('Búsqueda no realizada: Fecha Inicial y/o Fecha Final NO pueden ser posteriores a la Fecha de Hoy');
        }
        else if (startDate > endDate) {
        	console.log('\t\t\tBúsqueda no realizada');
            $scope.setServiceError('Búsqueda no realizada: Fecha Inicial debe ser anterior a la Fecha Final');
        }
        else {
        	console.log('\t\t\tBúsqueda a realizarse');
            $scope.getTransactions($scope.searchParams.date_start, $scope.searchParams.date_end);
        }
    } 
    else if($scope.searchParams.date_start === null && $scope.searchParams.date_end === null) {
		params.date_end = null;
		params.date_start = null;
		accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
			function(data){
			    $scope.investmentTransactions = $rootScope.transactions;
			},
			function(errorObject) {
				var status = errorObject.status;
		        var msg = codeStatusErrors.errorMessage(status);
				if (status === 500){
	            	$scope.setServiceError(msg + errorObject.response.message);
	        	} else {
	        		$scope.setServiceError(msg);
	        	}
			}
		);
	}
  };

	$scope.getStatements = function(){
		$scope.statementStatus.showStatement = true

		accountsProvider.getStates($stateParams.accountId).then(
			function(data) {
				$scope.statements = $rootScope.statements;
			},
			function(errorObject) {
				var status = errorObject.status;
		        var msg = codeStatusErrors.errorMessage(status);
				if (status === 500){
	            	$scope.setServiceError(msg + errorObject.response.message);
	        	} else {
	        		$scope.setServiceError(msg);
	        	}
			}
		);
	};

	/**
	 * build the url for account-state-file download
	 */
	$scope.getStatementUrl = function(id, format){
		return $scope.restAPIBaseUrl+'/files/statement?format='+format+'&id='+id+'&session_id='+$rootScope.session_token;
	}

}]);
