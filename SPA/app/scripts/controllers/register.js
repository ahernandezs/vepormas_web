'use strict';

angular.module('spaApp').controller('RegisterCtrl', ['$scope','$location', 'userProvider', '$rootScope' , function ($scope, $location, userProvider, $rootScope) {

	$scope.selection = 1;
	$scope.bankBranch = '';
    // Stores the register data
    $scope.registerData = {};

    $scope.incorrectData = false;
    $scope.errorMessage = "";
    
    $scope.init = function() {
        $scope.contract = $rootScope.preData.contract;
        $scope.nameClient = $scope.contract.name;
        $scope.clientNumber = $scope.contract.client_id;
        var temp = new Date($scope.contract.created_at);
        $scope.date = temp.getDay() + ' / ' + temp.getMonth() + ' / ' + temp.getFullYear();
        $scope.images = {};
        for (var i = 0; i < $rootScope.preData.images.length; i++) {
            $scope.images[i] = { 'id' : $rootScope.preData.images[i].image_id, 'url' : $rootScope.restAPIBaseUrl + '/' + $rootScope.preData.images[i].url };
        }
        console.log( $scope.images );
    };
    
	/**
		Function for navigate when step complete  .
	**/
	 $scope.completeStep =function(nextStep){
		$scope.selection = nextStep;
	 }

	 /**
		Function for go to login page
	 **/
	 $scope.gotoLogin =function(){
		$location.path( '/login' );
	 }

	 /**
	  * validate the client's password
	  */
	$scope.confirmPassword = function () {
		if(! $scope.registerData.password){
			$scope.incorrectData = true;
        	$scope.errorMessage = "Las contrasenas no puede ser vacia";
		}else if($scope.registerData.password == $scope.registerData.repeatPass){
        	$scope.incorrectData = false;
        	$scope.errorMessage = null;
        	$scope.completeStep(3);
        }else{
        	$scope.incorrectData = true;
        	$scope.errorMessage = "Las contrasenas ingresadas no son iguales";
        }
	};

	/**
	  * validate the client's image
	  */
	$scope.confirmImage = function () {
        if($scope.registerData.selectedImage){
        	$scope.incorrectData = false;
        	$scope.errorMessage = null;
        	$scope.completeStep(4);
        }else{
        	$scope.incorrectData = true;
        	$scope.errorMessage = "Se debe escoger una imagen";
        }
	};

	/**
	  * validate the client's contact-information (phone number and email)
	  */
	$scope.confirmContactInformation = function () {
        $scope.incorrectData = false;
        $scope.errorMessage = null;
        if(! $scope.registerData.contactType){
            $scope.incorrectData = true;
            $scope.errorMessage = "una manera de contactarle debe ser escogida";
        }else{
            if($scope.registerData.email){
                if($scope.registerData.email != $scope.registerData.repeatEmail){
                    $scope.incorrectData = true;
                    $scope.errorMessage = "Los emails ingresados no son iguales";
                }
            }else{
                if($scope.registerData.contactType == "byEmail"){
                    $scope.incorrectData = true;
                    $scope.errorMessage = "Se debe ingresar un email";
                }
            }
            if($scope.registerData.cellphone){
                if($scope.registerData.cellphone != $scope.registerData.repeatCellphone){
                    $scope.incorrectData = true;
                    $scope.errorMessage = "Los numero de telefonos ingresados no son iguales";
                }
            }else{
                if($scope.registerData.contactType == "byCellPhone"){
                    $scope.incorrectData = true;
                    $scope.errorMessage = "Se debe ingresar un numero de telefono";
                }
            }
        }
        if(!$scope.incorrectData){
            $scope.completeStep(5);
        }
	};

    /*
     * confirm token 
     */
    $scope.confirmToken = function () {
        $scope.incorrectData = false;
        $scope.errorMessage = null;
        if(! $scope.registerData.acceptLegalMention){
            $scope.incorrectData = true;
            $scope.errorMessage = "debe acuerdar con los terminos de Consubanco";
        }
        if(! $scope.incorrectData){
            userProvider.registerUser($scope.clientNumber, $scope.registerData.selectedImage,
                $scope.registerData.password, $scope.registerData.email,$scope.registerData.cellphone).then(
                function(data) {
                    console.log("register succeed");
                    $scope.completeStep(6);
                },
                function(data, status) {
                    $scope.incorrectData = true;
                    $scope.errorMessage = "un errore occuro";
                }
            );
        }
    };
}]);
