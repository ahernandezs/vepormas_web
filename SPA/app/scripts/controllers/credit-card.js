'use strict';

/**
 * The credit card controller.
 */
angular.module('spaApp').controller('creditCardCtrl', ['$scope', '$location', '$stateParams', 'accountsProvider', '$rootScope', '$http', '$sce', function ($scope, $location, $stateParams, accountsProvider, $rootScope, $http, $sce) {

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
		},function(data) {
			var message = data.response.message;
			$scope.setServiceError(message);
		}
	);

	accountsProvider.getTransactions($scope.selectedAcccountId, params).then(
		function(data){
			$scope.creditCardTransactions = $rootScope.transactions;
		},function(data) {
			var message = data.response.message;
			$scope.setServiceError(message);
		}
	);

	$scope.getStatements = function(){
		$scope.showStatement = true;
		accountsProvider.getStates($stateParams.accountId).then(
			function(data) {
				$scope.statements = $rootScope.statements;
			},function(data) {
				var message = data.response.message;
				$scope.setServiceError(message);
			}
		);
	};

	$scope.getStatement = function(id, format){
		$http.get($rootScope.restAPIBaseUrl+'/files/statement?format='+format+'&id='+id+'&_account_id='+$stateParams.accountId, {responseType: 'arraybuffer'})
			.success(function (data) {
			var file = new Blob(['data:application/pdf;base64,'+data], {type: 'application/pdf'});
			var fileURL = URL.createObjectURL(file);
			$scope.content = $sce.trustAsResourceUrl(fileURL);


  var raw = window.atob('data:application/pdf;base64,'+data);

  window.open($sce.trustAsResourceUrl(fileURL));

  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for(var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }

window.open(array);
//window.open("data:application/pdf;base64," + Base64.encode(data));


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
				},function(data) {
					var message = data.response.message;
					$scope.setServiceError(message);
				}
			);
		}
	};

}]);
