'use strict';

angular.module('spaApp').controller('RegisterCtrl', ['$scope','$location', 'userProvider' , function ($scope, $location, userProvider) {

	$scope.selection = 1;

	$scope.clientNumber = 'XXXXXX0435';
	$scope.nameClient = 'Alfonzo Perez Tovar';
	$scope.bankBranch = 'Eduardo Molina';
	$scope.date = '18/JUN/2014';

	/**
		Function for navigate when complete step .
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
		Function for register
	 **/
	 $scope.registerCustomer =function(){
		//TODO:implements REST  method register
	};

}]);
