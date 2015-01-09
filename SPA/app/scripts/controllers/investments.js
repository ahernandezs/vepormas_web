'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('InvestmentsCtrl', ['$scope', '$location', 'ngTableParams',  '$stateParams', 'accountsProvider', '$rootScope', function ($scope, $location, ngTableParams, $stateParams, accountsProvider, $rootScope) {

    var params = {};
    params.numPage = 0;
    params.size = 100;

    accountsProvider.getAccountDetail($stateParams.accountId+'-'+$scope.selectedAccountType).then(
      function(data) {
        $scope.investmentHeader = $rootScope.accountDetail.investment;
      }
    );

    accountsProvider.getTransactions($scope.selectedAcccountId+'-'+$scope.selectedAccountType, params).then(
        function(data){
            $scope.investmentTransactions = $rootScope.transactions;
        });

    $scope.getTransactions = function(date_start, date_end){
        params.date_end = date_end;
        params.date_start = date_start;
        accountsProvider.getTransactions($scope.selectedAcccountId+'-'+$scope.selectedAccountType, params).then(
            function(data){
                $scope.investmentTransactions = $rootScope.transactions;
        });
    }

}]);
