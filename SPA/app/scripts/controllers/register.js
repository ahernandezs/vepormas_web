'use strict';

angular.module('spaApp').controller('RegisterCtrl', ['$scope','$location', 'userProvider', '$rootScope' , function ($scope, $location, userProvider, $rootScope) {

	$scope.selection = 1;
	$scope.bankBranch = 'Eduardo Molina';
    // Stores the register data
    $scope.registerData = {};
    
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
		Function for register
	 **/
	 $scope.registerCustomer = function () {
         var identifier = { 'name' : 'cuenta', 'value' : 'cuenta' };
		/*userProvider.registerUser(identifier, $scope.clientNumber).then( function() {
            
        });*/
	};

}]);
