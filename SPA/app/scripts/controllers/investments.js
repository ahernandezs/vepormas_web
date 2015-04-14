'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('InvestmentsCtrl', ['$scope', '$location', 'ngTableParams',  '$stateParams', 'accountsProvider', '$rootScope', 'codeStatusErrors', function ($scope, $location, ngTableParams, $stateParams, accountsProvider, $rootScope, codeStatusErrors) {

    var params = {};
    params.numPage = 0;
    params.size = 100;

    $scope.searchParams = {};

    accountsProvider.getAccountDetail($stateParams.accountId).then(
        function(data) {
            $scope.investmentHeader = $rootScope.accountDetail.investment;
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

    $scope.getTransactions = function(date_start, date_end){
        params.date_end = date_end;
        params.date_start = date_start;
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

    $scope.search = function() {
      if($scope.searchParams.date_start && $scope.searchParams.date_end) {
        if ($scope.searchParams.date_start > $scope.searchParams.date_end) {
            $scope.setServiceError('La fecha inicial debe ser anterior a la fecha final');
        }
        else {
            $scope.getTransactions($scope.searchParams.date_start, $scope.searchParams.date_end);
        }
      } else if($scope.searchParams.date_start === null && $scope.searchParams.date_end === null) {
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

}]);
