'use strict';

/**
 * The transactions controller. For transactions between own accounts.
 */
angular.module('spaApp').controller('purchaseRetireVistaCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'accountsProvider', 'transferProvider', 'codeStatusErrors', function ($rootScope, $scope, $location, $routeParams, accountsProvider, transferProvider, codeStatusErrors) {


    $scope.investmentCategory = null;

    initialize();

    $scope.investment.vistaAccount = '';
    $scope.investment.depositAccount = '';

    function initialize(){
        //TODO: the accounts shoud come from the provider
        $scope.depositAccounts = [];
        $scope.vistaAccounts = [];
        for (var index = 0; index < $rootScope.accounts.length; ++index) {
            var account = $rootScope.accounts[index];
            if(account.account_type === 'DEP'){
                $scope.depositAccounts.push(account);
            }else if( account.account_type === 'INV' && account.category === 'VISTA'){
                $scope.vistaAccounts.push(account);
            }
        }
        $scope.step = 1;
        $scope.investment = [];
        $scope.investment.vistaAccount = '';
        $scope.investment.depositAccount = '';
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
     * Goes back one step.
     */
    $scope.goBack = function() {
        $scope.step--;
    };

    /**
     * process a Rest-API onvocation error
     */
    function processServiceError(errorObject){
        var status = errorObject.status;
        var msg = codeStatusErrors.errorMessage(status);
        if (status === 500){
            $scope.setServiceError(msg + errorObject.response.message);
        } else {
            // $scope.setServiceError('Ha ocurrido un problema, favor de contactar al servicio de atención al cliente');
            $scope.setServiceError(msg);
        }
    }

    /**
     * Function to navigate between steps.
	 */
	$scope.gotToConfirmation = function() {
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
      * launch the purchase Vista investment operation
      */
    $scope.purchaseInvestment = function(){
        resetError();
        transferProvider.investVista($scope.investment.depositAccount._account_id, $scope.investment.vistaAccount._account_id, $scope.investment.amount).then(
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
            },
            processServiceError
        );
    }

    /**
      * launch the retire Vista investment operation
      */
    $scope.retireInvestment = function(){
        resetError();
        transferProvider.retireVista($scope.investment.vistaAccount._account_id, $scope.investment.depositAccount._account_id, $scope.investment.amount).then(
            function(data){
                $scope.step++;
            },
            processServiceError
        );
    }

}]);
