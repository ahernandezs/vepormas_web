'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('InvestmentsCtrl', ['$scope', '$location', 'ngTableParams',  '$stateParams', 'accountsProvider', '$rootScope', 'codeStatusErrors', function ($scope, $location, ngTableParams, $stateParams, accountsProvider, $rootScope, codeStatusErrors) {

    var params = {};
    params.numPage = 0;
    params.size = 100;

    $scope.searchMessage = 'false';

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
                $scope.setServiceError('Busqueda no realizada: Fecha Inicial y/o Fecha Final NO pueden ser posteriores a la Fecha de Hoy');
            }
            else if (startDate > endDate) {
                $scope.setServiceError('Busqueda no realizada: Fecha Inicial debe ser anterior a la Fecha Final');
            }
            else {
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

}]);
