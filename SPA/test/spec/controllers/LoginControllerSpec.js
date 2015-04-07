'use strict';

describe('LoginCtrl', function() {
  var LoginCtrl, scope;

  beforeEach(module('spaApp'));

  beforeEach(inject(function($controller, $rootScope) {
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
});
