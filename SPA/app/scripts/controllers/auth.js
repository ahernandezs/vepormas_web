'use strict';

/**
 * login controller
 * inject a login function in the scope
 */
angular.module('spaApp')
.controller('LoginCtrl', ['$scope', '$http', '$location', 'api', '$rootScope', 'userProvider', function ($scope,$http,$location, api, $rootScope, userProvider) {
  /**
   * If user has a valid session token keep him in dashboard
   */

  if($rootScope.session_token && $location.$$path === '/login') {
    $location.path('/accounts');
  }
  /**
   * the login function connect the Rest-API: if the response status is OK, redirect to route "accounts",
   * else put an error message in the scope
   */

  $scope.username = "";
  $scope.password = "";
 
  $scope.incorrectData = false;
  $scope.showImageLogin = false;

  $scope.checkingUser = false;
  $scope.isLogin = false;

  $scope.reset=function(){
    $scope.checkingUser = false;
    $scope.incorrectData = false;
    $scope.showImageLogin = false;
    $scope.username = "";
    $scope.password = "";
  }


  /************************ Navigation ***********************************/
  /**
    Function for verify if exist user
  **/
  $scope.checkUser = function(){
    $scope.checkingUser = true;
    $scope.incorrectData = false;

    console.log($scope.username);

    if(!$scope.username.trim()) {
      $scope.checkingUser = false;
      $scope.incorrectData = true;

      $scope.errorMessage = '!Usuario incorrecto¡ favor de verificarlo';

      return;
    }

    var json = JSON.stringify({'user_login':$scope.username,'client_application_id': 'PROSA-DIG'});
    console.log(json);
    $http({
      url: $scope.restAPIBaseUrl+'/checkLogin',
      method: 'POST',
      data: json,
      headers: {'Content-Type': 'application/json','X-BANK-TOKEN': '4'}
    }).
    success(function(data, status, headers) {
      $scope.showImageLogin = true;
      $scope.client_name = data.client_name;
      console.log(data);
      $scope.images = data.images;
      $scope.incorrectData = false;
      $scope.checkingUser = false;
    }).
    error(function(data, status) {
      console.log("Status : ", status);
      $scope.errorMessage = 'Error en el servicio, intente más tarde';
      if(status === 400){
        $scope.errorMessage = 'Existe una sesión vigente en otra aplicación';
      }
      if(status === 406 || status === 503 || status === 0){
        $scope.errorMessage = 'Error en el servicio, intente más tarde';
      }
      $scope.status = status;
      $scope.incorrectData = true;
      $scope.checkingUser = false;
    });
  
  }

  /**
    Function for authenticate user through middleware
  **/
  $scope.login = function(){
    $scope.isLogin = true;
    $scope.incorrectData = false;
    console.log("usuario, password, selectedImage", $scope.username, $scope.password, $scope.selectedImage);

    if(!$scope.password.trim() || !$scope.selectedImage) {
      $scope.isLogin = false;
      $scope.incorrectData = true;

      $scope.errorMessage = 'Por favor, seleccione su imagen e introduzca su contraseña';

      return;
    }

    if(!$scope.selectedImage) {
      $scope.isLogin = false;
      $scope.incorrectData = true;

      $scope.errorMessage = 'Por favor, seleccione una imagen';

      return;
    }

    $http({
      url: $scope.restAPIBaseUrl+'/login',
      method: 'POST',
      data: JSON.stringify({'user_login':$scope.username, 'password':$scope.password,'client_application_id': 'PROSA-DIG' , 'image_id': $scope.selectedImage.toString() }) ,
      headers: {'Content-Type': 'application/json','X-BANK-TOKEN': '4'}
    }).
      success(function(data, status, headers) {
      var token = headers('X-AUTH-TOKEN');
      $rootScope.session_token = token;
      $rootScope.last_access_date = data.last_access_date
      $rootScope.last_access_media = data.last_client_application_id;
      $rootScope.client_name = data.client_name;
      api.init();
      $location.path( '/accounts' );
    }).
      error(function(data, status) {
      //put an error message in the scope
      console.log("Status, code : ", status, data.code);
      $scope.errorMessage = 'Error en el servicio, intente más tarde';
      if(status === 400){
          if(data.code === 500)
            $scope.errorMessage = 'El password o imagen son incorrectos';
          if(data.code === 510)
            $scope.errorMessage = 'Existe una sesión vigente en otra aplicación';
          if(data.code === 301)
            $scope.errorMessage = 'Por favor, introduzca su contraseña y seleccione su imagen';
          if(data.code === 501)
            $scope.errorMessage = 'Su usuario ha sido bloqueado por intentos fallidos';
      }
      if(status === 423){
        $scope.errorMessage = 'Existe una sesión vigente en otra aplicación';
      }
      if(status === 503){
        $scope.errorMessage = 'Error en el servicio, intente más tarde';
      }
      if(status === 504){
        $scope.errorMessage = 'Tiempo de respuesta excedido, por favor intente más tarde';
      }
      $scope.status = status;
      $scope.incorrectData = true;
      $scope.isLogin = false;
    });

  };

  /**
    Function for validate data before register
  **/
  $scope.preRegister = function(client,contract){
      //TODO:Veryfy with REST service if exists contract?
      userProvider.verifyUser(client, contract).then(function(data) {
        $rootScope.preData = data;
        $location.path( '/register');
      });
  }

}]);


