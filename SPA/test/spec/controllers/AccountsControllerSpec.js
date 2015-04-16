'use strict';

describe('AccountsCtrl', function() {
  
  var accountsCtrl, dashboardCtrl, scope, http, accounts;

  beforeEach(module('spaApp','mockedAccounts'));

  beforeEach(inject(function($controller, $rootScope, $httpBackend, accountsJSON) {
    scope = $rootScope.$new();
    http = $httpBackend;
    $rootScope.session_token="notEmpty";
    //the getAccounts http response mockup
    http.when('GET', scope.restAPIBaseUrl + '/accounts').respond(
      200,
      accountsJSON,
      {
        "X-AUTH-TOKEN" : $rootScope.session_token
      }
    );
    //initialize the parent's controller
    dashboardCtrl = $controller('DashBoardCtrl', {
      $scope: scope
    });
    //initialize the controller
    accountsCtrl = $controller('AccountsCtrl', {
      $scope: scope
    });
  }));

  describe('when connecting to dashboard', function() {      
    it("should get the user's accounts", function() {
      http.flush();
      expect(scope.accounts.length).toBe(7);
    });
  });

  //to prevent the confirmation message when closing the windows
  afterEach(inject(function($rootScope) {
    $rootScope.session_token=null;
  }));
   
});
