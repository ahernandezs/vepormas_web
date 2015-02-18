'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('InvestmentCedePrlvCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'transferProvider', 'productProvider', function ($rootScope, $scope, $location, $routeParams, accountsProvider, transferProvider, productProvider) {


    $scope.investmentCategory = null;

    initialize();

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
        $scope.investmentResult = [];
        resetError();
    }

    /**
     * set an error message on the current view
     */
    function setError(message){
        $scope.errorMessage = message;
        $scope.error = true;
    }

    /**
     * reset the error status to null
     */
    function resetError(){
        $scope.error = false;
    }

    /**
     * process a Rest-API invocation success
     */
    function processServiceSuccess(data) {
        $scope.investmentResult = [];
        $scope.investmentResult.account_number = data.account_number;
        $scope.investmentResult.expiration_date = data.expiration_date;
        if(data.interest != null){
            $scope.investmentResult.interestInfo =[];
            $scope.investmentResult.interestInfo.operation_date = data.interest.operation_date;
            $scope.investmentResult.interestInfo.amount = data.interest.amount;
        }
        $scope.step++;
    }

    /**
     * process a Rest-API onvocation error
     */
    function processServiceError(errorObject){
        var status = errorObject.status;
        if(status === 406){
            setError('invalid input');
        }else if(status === 500){
            setError('el servicio esta disponible. Favor de intentar mas tarde');
        }else{
            setError('un problema occurio. Favor de contactar el servicio de atencion al cliente');
        }
        var data = errorObject.data;
    }

    /**
     * set the investment type (CEDE or PRLV)
     */
    $scope.setInvestmentType = function(investmentCategory){
        $scope.investmentCategory = investmentCategory;
        //initialize the instruction investment array
        //TODO: manage the labels with i18n
        $scope.investmentInstructions = [{'investAgain' : false, 'label' : "Transferencia Cuenta Eje"}];
        if($scope.investmentCategory === 'CEDE'){
            $scope.investmentInstructions.push({'investAgain' : true, 'label' : "Reinversión de Capital con Pago de Interés"});
        }else if($scope.investmentCategory === 'PRLV'){
            $scope.investmentInstructions.push({'investAgain' : true, 'label' : "Reinversión de Capital e Intereses"});
        }
    }

    /**
     * Function to navigate between steps.
	 */
	$scope.goToConfirmation = function() {
        resetError();
        $scope.step++;
        $scope.today = new Date().getTime();
	 };

    /**
     * Function to navigate between steps.
     */
    $scope.reset = function() {
        initialize();
     };

     /**
      * launch the investment operation
      */
     $scope.launchInvestment = function(){
        resetError();
        var currentInvestment = $scope.investment;
        var originAccountId = currentInvestment.originAccount._account_id;
        var productId = currentInvestment.destinationProduct.product_id;
        var amount = currentInvestment.amount;
        var investAgain = currentInvestment.expirationInstruction.investAgain;
        if($scope.investmentCategory === 'CEDE'){
            transferProvider.investCEDE(originAccountId, productId, amount, investAgain).then(
                processServiceSuccess,
                processServiceError
            );
        }else if($scope.investmentCategory === 'PRLV'){
            transferProvider.investPRLV(originAccountId, productId, amount, investAgain).then(
                processServiceSuccess,
                processServiceError
            );
        }else{
            setError('tipo de inversion desconocido');
         }
     }

     $scope.calculateEstimation = function(){
        productProvider.getProductDetail($scope.investment.destinationProduct.product_id, $scope.investment.amount).then(
            function(data) {
                $scope.investmentEstimation = data;
            }
        );
     }

}]);
