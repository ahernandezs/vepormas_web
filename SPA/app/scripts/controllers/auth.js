'use strict';

/**
 * login controller
 * inject a login function in the scope
 */
angular.module('spaApp')
.controller('LoginCtrl', ['$scope', '$http', '$location', 'api', '$rootScope', '$window', 'userProvider', function ($scope,$http,$location, api, $rootScope, $window, userProvider) {
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
  $scope.loginData = {};

  $scope.incorrectData = false;
  $scope.showImageLogin = false;

  $scope.checkingUser = false;
  $scope.isLogin = false;

  $scope.reset=function(){
    $scope.checkingUser = false;
    $scope.incorrectData = false;
    $scope.incorrectLoginData = false;
    $scope.showImageLogin = false;
    $scope.loginData.username = "";
    $scope.loginData.password = "";
  }


  /************************ Navigation ***********************************/
  /**
    Function for verify if exist user
  **/
  $scope.checkUser = function(){
    $scope.checkingUser = true;
    $scope.incorrectData = false;

    console.log($scope.loginData.username);

    if(!$scope.loginData.username.trim()) {
      $scope.checkingUser = false;
      $scope.incorrectData = true;

      $scope.errorMessage = '!Usuario incorrecto¡ favor de verificarlo';

      return;
    }

    var json = JSON.stringify({'user_login':$scope.loginData.username,'client_application_id': 'PROSA-DIG'});
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
      $scope.status = status;
      $scope.incorrectData = true;
      $scope.checkingUser = false;
    });
  
  }

  /**
   * Set error messages
   **/
  $scope.setLoginErrorMessages = function(status, code) {
    console.log("Status, code : ", status, code);
    $scope.errorMessage = 'Error en el servicio, intente más tarde';
    if(status === 400){
      if(code === 500)
        $scope.errorMessage = 'El password o imagen son incorrectos';
      if(code === 510)
        $scope.errorMessage = 'Existe una sesión vigente en otra aplicación';
      if(code === 301)
        $scope.errorMessage = 'Por favor, introduzca su contraseña y seleccione su imagen';
      if(code === 501)
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
    $scope.incorrectLoginData = true;
    $scope.isLogin = false;
  };

  /**
    Function for authenticate user through middleware
  **/
  $scope.login = function(){
    $scope.isLogin = true;
    $scope.incorrectLoginData = false;
    console.log("usuario, password, selectedImage", $scope.username, $scope.password, $scope.selectedImage);

    if(!$scope.loginData.password.trim() || !$scope.loginData.selectedImage) {
      $scope.isLogin = false;
      $scope.incorrectLoginData = true;

      $scope.errorMessage = 'Por favor, seleccione su imagen e introduzca su contraseña';

      return;
    }

    if(!$scope.loginData.selectedImage) {
      $scope.isLogin = false;
      $scope.incorrectLoginData = true;

      $scope.errorMessage = 'Por favor, seleccione una imagen';

      return;
    }

    $http({
      url: $scope.restAPIBaseUrl+'/login',
      method: 'POST',
      data: JSON.stringify({'user_login':$scope.loginData.username, 'password':$scope.loginData.password,'client_application_id': 'PROSA-DIG' , 'image_id': $scope.loginData.selectedImage.toString() }) ,
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
      $scope.setLoginErrorMessages(status, data.code);
    });

  };

  /**
    Function for validate data before register
  **/
  $scope.preRegister = function(client,contract){
      //TODO:Veryfy with REST service if exists contract?
      userProvider.setClientId(client);
      userProvider.preRegisterUser(contract).then(function(data) {
        $location.path( '/register');
      });
  }

  if($window.username) {
    $scope.loginData.username = $window.username;

    $scope.checkUser();

    // get errors from backend
    $scope.setLoginErrorMessages(parseInt($window.status), parseInt($window.code));
  }


}]);


