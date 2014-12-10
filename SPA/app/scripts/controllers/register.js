'use strict';

angular.module('spaApp').controller('RegisterCtrl', ['$scope','$location', 'userProvider' , function ($scope, $location, userProvider) {

	$scope.selection = 1;

	$scope.clientNumber = 'XXXXXX0435';
	$scope.nameClient = 'Alfonzo Perez Tovar';
	$scope.bankBranch = 'Eduardo Molina';
	$scope.date = '18/JUN/2014';
    $scope.registerData = {};


    $scope.images = [
    {id:'00001', url: './../../images/perro.png'},
    {id:'00002', url: './../../images/playa.png'},
    {id:'00003', url: './../../images/puerto.png'},
    {id:'00004', url: './../../images/bosque.png'},
    ];
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
		Function for register
	 **/
	 $scope.registerCustomer =function(){
		//TODO:implements REST  method register
	};

}]);
