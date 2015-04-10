'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('PortfolioCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'transferProvider', 'productProvider', '$filter', function ($rootScope, $scope, $location, $routeParams, accountsProvider, transferProvider, productProvider, $filter) {

    $scope.ownAccounts = [];
    $scope.depositAccounts = [];
    $scope.vistaAccounts = [];

     //Get investments products.
    productProvider.getProductsList().then(
      function(data) {
          $scope.investmentProducts = data.products;
          if(data.investment_vista_allowed){
          	$scope.vistaInvestmentAllowed = true;
            $scope.invType = 'VISTA';
          }else{
            $scope.vistaInvestmentAllowed = false;
          }
          if(data.investment_prlv_allowed){
          	$scope.prlvInvestmentAllowed = true;
            if($scope.invType == null){
               $scope.invType = 'PRLV';
            }
          }else{
            $scope.prlvInvestmentAllowed = false;
          }
          if(data.investment_cede_allowed){
          	$scope.cedeInvestmentAllowed = true;
            if($scope.invType == null){
               $scope.invType = 'CEDE';
            }
          }else{
            $scope.cedeInvestmentAllowed = false;
            if($scope.invType == null){
              $scope.setServiceError('ninguno producto disponible');
            }
          }
      },
      function(data) {
          var message = data.response.message;
          $scope.setServiceError(message);
      }
    );

    /**
     * Get own accounts.
     */
    accountsProvider.getAccounts().then(
        function(data) {
            $rootScope.accounts.forEach(
                function (value, index, ar) {
                    if ( value.account_type == 'DEP' ) {
                        var formattedAmount = $filter('currency')(value.amount, '$');
                        value.displayName = value.name + ' ' + value.maskedAccountNumber + ' - ' + value.currency + ': ' + formattedAmount;
                        $scope.ownAccounts.push( value );
                        $scope.depositAccounts.push(value );
                     } else if ( value.account_type === 'INV' && value.category === 'VISTA' ) {
                        var formattedAmount = $filter('currency')(value.balance, '$');
                        value.displayName = value.name + ' ' + value.maskedAccountNumber + ' - ' + value.currency + ': ' + formattedAmount;
                        $scope.vistaAccounts.push(value);
                     }
                }
            );
         },
         function(errorObject) {
             var status = errorObject.status;
             if (status === 406) {
                 $scope.setServiceError('datos inválidos');
             } else if(status === 500) {
                 var message = errorObject.response.message;
                 $scope.setServiceError(message);
             } else {
                 $scope.setServiceError('Error en el servicio, intente más tarde');
             }
         }
    );

    /**
     * Assigns the value to the first view to return to and the investment type.
     */
    $scope.change = function(type) {
        $scope.invType = type;
    };

}]);
