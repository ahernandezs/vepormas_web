'use strict';

angular.module('spaApp').controller('MapCtrl', ['$scope', '$rootScope', 'mapProvider', function ($scope,  $rootScope, mapProvider) {

	$scope.details = {};
	$scope.estados = [	{'id':'df','name':'Distrito Federal'},
						{'id':'ags','name':'Aguascalientes'},
						{'id':'bc','name':'Baja California'},
						{'id':'bcs','name':'Baja California sur'},
						{'id':'camp','name':'Campeche'},
						{'id':'coah','name':'Coahuila'},
						{'id':'col','name':'Colima'},
						{'id':'chis','name':'Chiapas'},
						{'id':'chih','name':'Chihuahua'},
						{'id':'gto','name':'Guanajuato'},
						{'id':'gro','name':'Guerrero'},
						{'id':'hgo','name':'Hidalgo'},
						{'id':'jal','name':'Jalisco'},
						{'id':'mex','name':'México'},
						{'id':'mich','name':'Michoacán'},
						{'id':'mor','name':'Morelos'},
						{'id':'nay','name':'Nayarit'},
						{'id':'nl','name':'Nuevo León'},
						{'id':'oax','name':'Oaxaca'},
						{'id':'pue','name':'Puebla'},
						{'id':'qro','name':'Querétaro'},
						{'id':'qr','name':'Quintana Roo'},
						{'id':'slp','name':'San Luis Potosí'},
						{'id':'sin','name':'Sinaloa'},
						{'id':'son','name':'Sonora'},
						{'id':'tab','name':'Tabasco'},
						{'id':'tamp','name':'Tamaulipas'},
						{'id':'tlax','name':'Tlaxcala'},
						{'id':'ver','name':'Veracruz'},
						{'id':'yuc','name':'Yucatán'},
						{'id':'zac','name':'Zacatecas'}
					];
	$scope.showBranches = false;

	//search branches
	$scope.search = function(){
		if(Object.keys($scope.details).length==0){
			if($scope.estado!=undefined){
				console.log('nada seleccionado, buscar por edo '+$scope.estado.name);
				//TODO
			}
		}else{
			mapProvider.getBranches({'lat':$scope.details.geometry.location.k,'lng':$scope.details.geometry.location.D}).then(
				function(data) {
					$scope.map.branches = $rootScope.branches;
					$scope.showBranches = true;
				}
			);
		}
	}

	$scope.searchNearMe = function(){
		maps.getbou
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
				mapProvider.getBranches({'lat':position.coords.latitude,'lng':position.coords.longitude}).then(
					function(data) {
						$scope.map.branches = $rootScope.branches;
						$scope.showBranches = true;
					}
				);
			}, function() {
				handleNoGeolocation(true);
			});
		} else {
			handleNoGeolocation(false);
		}
	}

	//Center defined by default
	$scope.map = { center: { latitude: 19.432602, longitude: -99.13320499999998 }, zoom: 15 };
	$scope.map.branches = {};
	var geocoder = new google.maps.Geocoder();

	//Calculates the actual user location by geolocalization
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			$scope.map.center = {
									latitude: position.coords.latitude,
									longitude: position.coords.longitude
								};
		}, function() {
			handleNoGeolocation(true);
		});
	} else {
		handleNoGeolocation(false);
	}

	function handleNoGeolocation(errorFlag) {
		if (errorFlag) {
			console.log('Error: The Geolocation service failed.');
			var content = 'Error: The Geolocation service failed.';
		} else {
			console.log('Error: Your browser does not support geolocation.');
			var content = 'Error: Your browser does not support geolocation.';
		}
	}

	//this function fetch all the bank's branches at the beginning
	/*mapProvider.getBranches({}).then(
		function(data) {
			$scope.map.branches = $rootScope.branches;
		}
	);*/

}]);
