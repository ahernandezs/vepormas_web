'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('PortfolioCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'transferProvider', 'productProvider', function ($rootScope, $scope, $location, $routeParams, accountsProvider, transferProvider, productProvider) {

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
     * Assigns the value to the first view to return to and the investment type.
     */
    $scope.change = function(type) {
        $scope.invType = type;
    };

}]);
