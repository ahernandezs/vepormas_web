'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('PortfolioCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'transferProvider', 'productProvider', function ($rootScope, $scope, $location, $routeParams, accountsProvider, transferProvider, productProvider) {

    $scope.invType = 'VISTA';

     //Get investments products.
    productProvider.getProductsList().then(
      function(data) {
          $scope.investmentProducts = data.products;
          $scope.vistaInvestmentAllowed = false;
          if(data.investment_vista_allowed){
          	$scope.vistaInvestmentAllowed = true;
          }
          if(data.investment_prlv_allowed){
          	$scope.prlvInvestmentAllowed = true;
          }
          if(data.investment_cede_allowed){
          	$scope.cedeInvestmentAllowed = true;
          }
      },
      function(data) {
          var message = data.response.message;
          $scope.setServiceError(message);
      }
    );

    /**
     * Assigns the value to the first view to return to and the investment type.
     */
    $scope.change = function(type) {
        $scope.invType = type;
    };

}]);
