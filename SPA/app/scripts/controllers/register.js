'use strict';

angular.module('spaApp').controller('RegisterCtrl', ['$scope','$location', 'userProvider', '$rootScope' , function ($scope, $location, userProvider, $rootScope) {

    // the register-flow's current-step
	$scope.selection = 1;
    
    // stores the register's data inputed by the user
    $scope.registerData = {};

    // is there an error in the register flow
    $scope.error = false;

    // the error's message (is incorrectData is true)
    $scope.errorMessage = null;
    
    /**
     * initialize the scope with the model's data (coming from the preRegister operation)
     */
    $scope.init = function() {
        var preRegisterData = userProvider.getPreRegistrationData();
        $scope.contract = preRegisterData.contract;
        $scope.nameClient = $scope.contract.name;
        $scope.clientNumber = $scope.contract.client_id;
        $scope.bankBranch = $scope.contract.branch_name;
        var temp = new Date($scope.contract.created_at);
        $scope.date = temp.getDay() + ' / ' + temp.getMonth() + ' / ' + temp.getFullYear();
        $scope.images = {};
        for (var i = 0; i < preRegisterData.images.length; i++) {
            $scope.images[i] = { 'id' : preRegisterData.images[i].image_id, 'url' : $rootScope.restAPIBaseUrl + '/' + preRegisterData.images[i].url };
        }
        console.log( $scope.images );
    };
    
	/**
	 * go to the next flow's step
	 */
	 $scope.completeStep = function(nextStep){
        $scope.error = false;
        $scope.errorMessage = null;
		$scope.selection = nextStep;
	 }

	/**
	 * go back to the login page
	 */
	$scope.gotoLogin =function(){
        $scope.selection = 1;
        $scope.registerData = {};
        $scope.error = false;
        $scope.errorMessage = null;
		$location.path( '/login' );
	 }

	/**
	 * validate the client's password
	 */
	$scope.confirmPassword = function () {
		if(! $scope.registerData.password){
            setError("Las contraseñas no puede estar vacías");
		}else if($scope.registerData.password != $scope.registerData.repeatPass){
            setError("Las contraseñas ingresadas no coinciden");
        }else{
            // set the model and go to the next step
            userProvider.setPassword($scope.registerData.password);
            $scope.completeStep(3);
        }
	};

	/**
	 * validate the client's image
	 */
	$scope.confirmImage = function () {
        if($scope.registerData.selectedImage){
            // set the model and go to the next step
        	userProvider.setImageId($scope.registerData.selectedImage);
        	$scope.completeStep(4);
        }else{
            setError("Debe elegir una imagen");
        }
	};

	/**
	 * validate the client's contact-information (phone number and email)
	 */
	$scope.confirmContactInformation = function () {
        var error =false;
        if(! $scope.registerData.contactType){
            error = true;
            setError("Debe elegir una medio de notificación");
        }else{
            if($scope.registerData.email){
                if($scope.registerData.email != $scope.registerData.repeatEmail){
                    error = true;
                    setError("Los correos electrónicos no coinciden");
                }
            }else{
                if($scope.registerData.contactType == "byEmail"){
                    error = true;
                    setError("Debes ingresar una dirección de correo electrónico");
                }
            }
            if($scope.registerData.cellphone){
                if($scope.registerData.cellphone != $scope.registerData.repeatCellphone){
                    error = true;
                    setError("Los numeros de celular ingresados no coinciden");
                }
            }else{
                if($scope.registerData.contactType == "byCellPhone"){
                    error = true;
                    setError("Debe ingresar un número de celular");
                }
            }
        }
        //we could use the $scope.incorrectData instead of a local variable "error", but it show more clarity this way
        if(! error){
            userProvider.setEmail($scope.registerData.email);
            userProvider.setPhoneNumber($scope.registerData.cellphone);
            $scope.completeStep(5);
        }
	};

    /**
     * confirm token 
     */
    $scope.confirmToken = function () {
        if(! $scope.registerData.acceptLegalMention){
            setError("Debe aceptar los términos de Consubanco");
        }else{
            userProvider.registerUser().then(
                function(data) {
                    console.log("register succeed");
                    $scope.completeStep(6);
                },
                function(data, status) {
                    setError("Ha ocurrido un error en el registro");
                }
            );
        }
    };

    /**
     * private method: set an error on the register flow
     */
    function setError(errorMessage){
        $scope.error = true;
        $scope.errorMessage = errorMessage;
    };
}]);
