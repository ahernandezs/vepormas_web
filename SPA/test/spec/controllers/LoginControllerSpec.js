'use strict';

describe('LoginCtrl', function() {
  var LoginCtrl, scope, rootScope;

  beforeEach(module('spaApp'));

  beforeEach(inject(function($controller, $rootScope) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  describe('when is checking user', function() {

    var http;

    beforeEach(inject(function($httpBackend) {
      scope.loginData.username = '12345678';

      http = $httpBackend;

      $httpBackend.when('POST', scope.restAPIBaseUrl + '/checkLogin',
        {'user_login': scope.loginData.username, 'client_application_id': 'PROSA-DIG'}).
        respond(
         {"state":"OK",
          "images":[
            {"url":"KBA/user/2938674:clientTest3/images/142446831/photo.png","image_id":"142446831"},
            {"url":"KBA/user/2938674:clientTest3/images/386841490/photo.png","image_id":"386841490"},
            {"url":"KBA/user/2938674:clientTest3/images/1057974788/photo.png","image_id":"1057974788"},
            {"url":"KBA/user/2938674:clientTest3/images/1202255372/photo.png","image_id":"1202255372"},
            {"url":"KBA/user/2938674:clientTest3/images/1265955932/photo.png","image_id":"1265955932"},
            {"url":"KBA/user/2938674:clientTest3/images/1362314249/photo.png","image_id":"1362314249"},
            {"url":"KBA/user/2938674:clientTest3/images/1572653287/photo.png","image_id":"1572653287"},
            {"url":"KBA/user/2938674:clientTest3/images/1612744053/photo.png","image_id":"1612744053"},
            {"url":"KBA/user/2938674:clientTest3/images/1834735669/photo.png","image_id":"1834735669"},
            {"url":"KBA/user/2938674:clientTest3/images/2109066517/photo.png","image_id":"2109066517"}],
          "client_name":"John Doe"});

    }));

    it('should reset login error flag', function() {
      scope.checkUser();

      expect(scope.error).toBe(false);
    });

    it('should reset login error message', function() {
      scope.checkUser();

      expect(scope.errorMessage).toEqual("");
    });

    it('should enable flag that is checking user', function() {
      scope.checkUser();

      expect(scope.checkingUser).toBe(true);
    });

    it('should return a user name', function() {
      scope.checkUser();
      http.flush();

      expect(scope.client_name).toContain('John Doe');
    });

    it('should enable next step to ask for password', function() {
      scope.checkUser();
      http.flush();

      expect(scope.step).toBe(1);
    });

    it('should get images', function() {
      scope.checkUser();
      http.flush();

      expect(scope.images).not.toBe(null);
    });
  });

describe('when user is authenticated', function() {

    var http;

    beforeEach(inject(function($httpBackend,$rootScope) {
      scope.loginData.username = '12345678';
      scope.loginData.password = 'Prosa123';
      scope.loginData.selectedImage = '388600324';
      $rootScope.session_token = null;
      $rootScope.last_access_date = null;
      $rootScope.last_access_media = null;
      $rootScope.client_name = null;


      http = $httpBackend;
      $httpBackend.when('POST', scope.restAPIBaseUrl + '/login',
       {'user_login' : scope.loginData.username,
        'password':scope.loginData.password,
        'client_application_id':'PROSA-DIG',
        'image_id':scope.loginData.selectedImage}
        ).
        respond( {"role_id":0,
                  "client_name":"John Doe",
                  "last_access_date":1429120619866,
                  "last_client_application_id":"PROSA-DIG"},
                  {"Content-Type": "application/json",
                   "X-AUTH-TOKEN":"644e1dd7-2a7f-18fb-b8ed-ed78c3f92c2b"});
    }));

    it('should reset login error flag', function() {
      scope.login();
      expect(scope.error).toBe(false);
    });

    it('should reset login error message', function() {
      scope.login();
      expect(scope.errorMessage).toEqual("");
    });

    it('should enable flag isLogin', function() {
      scope.login();
      expect(scope.isLogin).toBe(true);
    });

    it('should disabled flag isLogin', function() {
      scope.login();
      http.flush();
      expect(scope.isLogin).toBe(false);
    });

    it('should return session token', function() {
      scope.login();
      http.flush();
      expect(rootScope.session_token).not.toBe(null);
      expect(rootScope.session_token).not.toEqual("");
    });

    it('should get last_access_date', function() {
      scope.login();
      http.flush();
      expect(rootScope.last_access_date).not.toBe(null);
      expect(rootScope.last_access_date).not.toEqual("");
    });

    it('should get last_access_media', function() {
      scope.login();
      http.flush();
      expect(rootScope.last_access_media).not.toBe(null);
      expect(rootScope.last_access_media).not.toEqual("");
    });

    it('should get client_name', function() {
      scope.login();
      http.flush();
      expect(rootScope.client_name).not.toBe(null);
      expect(rootScope.client_name).not.toEqual("");
    });

  });
});
