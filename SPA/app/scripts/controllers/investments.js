'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('InvestmentsCtrl', ['$scope', '$location', 'ngTableParams',  '$stateParams', 'accountsProvider', '$rootScope', function ($scope, $location, ngTableParams, $stateParams, accountsProvider, $rootScope) {

    accountsProvider.getAccountDetail($stateParams.accountId+'-INV').then(
      function(data) {
        $scope.investmentHeader = $rootScope.accountDetail.investment;
      }
    );

    var data = [{date: "Sep 18", transactionNumber: "001", description: "empresa 1", operationType: "Pago", amount: "3000"},
                {date: "Ago 19", transactionNumber: "002", description: "empresa 2", operationType: "Pago", amount: "5400"}];


    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10           // count per page
    }, {
        total: data.length, // length of data
        getData: function($defer, params) {
            $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });


}]);
