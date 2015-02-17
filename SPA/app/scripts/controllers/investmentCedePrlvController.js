'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('InvestmentCedePrlvCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'transferProvider', 'productProvider', function ($rootScope, $scope, $location, $routeParams, accountsProvider, transferProvider, productProvider) {


    $scope.investmentCategory = null;

    initialize();

    /**
     * set the investment type (CEDE or PRLV)
     */
    $scope.setInvestmentType = function(investmentCategory){
        $scope.investmentCategory = investmentCategory;
        //initialize the instruction investment array
        //TODO: manage the labels with i18n
        $scope.investmentInstructions = [{'code' : 1, 'label' : "Transferencia Cuenta Eje"}];
        if($scope.investmentCategory === 'CEDE'){
            $scope.investmentInstructions.push({'code' : 2, 'label' : "Reinversión de Capital con Pago de Interés"});
        }else if($scope.investmentCategory === 'PRLV'){
            $scope.investmentInstructions.push({'code' : 3, 'label' : "Reinversión de Capital e Intereses"});
        }
    }

    function initialize(){
        //Get investments products.
        productProvider.getProductsList().then(
            function(data) {
                $scope.investmentProducts = data;
            }
        );
        //TODO: the accounts shoud come from the provider
        $scope.ownAccounts = $rootScope.accounts;
        $scope.step = 1;
        $scope.investment = [];
        
    }

    /**
     * Function to navigate between steps.
	 */
	$scope.nextStep = function() {
        $scope.step++;
	 };

     /**
     * Function to navigate between steps.
     */
    $scope.cancel = function() {
        initialize();
     };

}]);
