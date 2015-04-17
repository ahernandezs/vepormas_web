'use strict';

describe('AccountsCtrl', function() {
  
  var accountsCtrl, dashboardCtrl, mainCtrl, scope, http, accounts;

  beforeEach(module('spaApp','mockedAccounts'));

  beforeEach(inject(function($controller, $rootScope, $httpBackend, accountsJSON) {
    scope = $rootScope.$new();
    http = $httpBackend;
    $rootScope.session_token="notEmpty";
    accounts = accountsJSON;
    //initialize the parent's controllers
    mainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
    dashboardCtrl = $controller('DashBoardCtrl', {
      $scope: scope
    });
    //initialize the controller
    accountsCtrl = $controller('AccountsCtrl', {
      $scope: scope
    });
  }));

  describe('when successfully loading accounts', function() {

    it("should get the user's accounts", function() {
      http.when('GET', scope.restAPIBaseUrl + '/accounts')
      .respond(
        200,
        accounts,
        {
          "X-AUTH-TOKEN" : scope.session_token
        }
      );
      http.flush();
      expect(scope.accounts.length).toBe(7);
      expect(scope.showTDCAccount).toBe(true);
      expect(scope.showInvestmentAccount).toBe(true);
      expect(scope.showSavingAccount).toBe(true);
      expect(scope.showCreditAccount).toBe(true);
    });
  });

  describe('when fails to load accounts', function() {
    it("should display a error-message", function() {
      //override the mock message
      http.when('GET', scope.restAPIBaseUrl + '/accounts').respond(
        503,
        {"code":null, "message" : "technical error"},
        {
          "X-AUTH-TOKEN" : scope.session_token
        }
      );
      http.flush();
      expect(scope.hasServiceError).toBe(true);
      
    });
  });

  //to prevent the confirmation message when closing the windows
  afterEach(inject(function($rootScope) {
    $rootScope.session_token=null;
  }));
   
});
