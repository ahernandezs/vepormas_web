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

  $scope.username;
  $scope.password;
 
  $scope.incorrectData = false;
  $scope.showImageLogin = false;

  $scope.loginUser=function(user){
    if(user=="rafa"){//next
        $scope.showImageLogin = true;
        $scope.incorrectData = false;
    }
    else{//error
      $scope.incorrectData = true;
    }
  }

  $scope.loginPassword=function(password){
    if(password=="pass"){//doLogin
      alert('doLogin()');
    }
    else{//error
      $scope.incorrectData = true;
    }
  }

  $scope.reset=function(){
  $scope.incorrectData = false;
  $scope.showImageLogin = false;
  }


  $scope.login=function(selectedValue){
    $scope.buttonStatus("Entrando ...", true);

    if(!selectedValue){ //no image selected
      console.log("No image selected")
      return;
    }

    console.log("image selected "+selectedValue);
  
  };

  /************************ Navigation ***********************************/
  /**
    Function for verify if exist user
  **/
  $scope.checkUser = function(username){
    var json = JSON.stringify({'user_login':username,'client_application_id': 'PROSA-DIG'});
    console.log(json);
    $http({
      url: $scope.restAPIBaseUrl+'/checkLogin',
      method: 'POST',
      data: json,
      headers: {'Content-Type': 'application/json','X-BANK-TOKEN': '4'}
    }).
      success(function(data, status, headers) {
        $scope.showImageLogin = true;
        $scope.username = username;
        $scope.client_name = data.client_name;
        console.log(data);
        $scope.images = data.images;
        $scope.incorrectData = false;
    }).
      error(function(data, status) {
      if(status === 400){
        $scope.errorMessage = 'Existe una sesíón vigente en otra aplicación';
      }
      if(status === 406){
        $scope.errorMessage = 'Error en el servicio';
      }
      if(status === 503){
        $scope.errorMessage = 'Error en el servicio';
      }
      $scope.status = status;
      $scope.incorrectData = true;
    });
  }

  /**
    Function for authenticate user through middleware
  **/
  $scope.login = function(password,selectedImage){
    $http({
      url: $scope.restAPIBaseUrl+'/login',
      method: 'POST',
      data: JSON.stringify({'user_login':$scope.username, 'password':password,'client_application_id': 'PROSA-DIG' , 'image_id': selectedImage }) ,
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
      if(status === 400){
          if(data.code === 500)
            $scope.errorMessage = 'El password o imagen son incorrectos';
          if(data.code === 510)
            $scope.errorMessage = 'Ya existe una sesión vigente';
          if(data.code === 301)
            $scope.errorMessage = 'No has ingresado el usuario o imagen';
      }
      if(status === 423){
        $scope.errorMessage = 'Existe una sesíón vigente en otra aplicación';
      }
      if(status === 503){
        $scope.errorMessage = 'Error en el servicio';
      }
      if(status === 504){
        $scope.errorMessage = 'Tiempo de respuesta excedido';
      }
      $scope.status = status;
      $scope.incorrectData = true;
    });

  };

  /**
    Function for validate data before register
  **/
  $scope.preRegister = function(client,contract){
      //TODO:Veryfy with REST service if exists contract?
      userProvider.verifyUser(client, contract).then(function() {
        $location.path( '/register');
      });
  }

}]);


