'use strict';

describe('AccountsCtrl', function() {
  var accountsCtrl, scope, http, accounts;

  beforeEach(module('spaApp','mockedAccounts'));

  beforeEach(inject(function($controller, $rootScope, $httpBackend, accountsJSON) {
    scope = $rootScope.$new();
    http = $httpBackend;
    console.log("accounts from mockups: "+accountsJSON);
    //the getAccounts http response mockup
   http.when('GET', scope.restAPIBaseUrl + '/accounts').respond(
      200,
      accountsJSON,
      {
        "X-AUTH-TOKEN" : "1234567890ABCDEF"
      }
    );
    //define the parent's scope functions
    scope.selectNavigatOption = function(selectedOption){};
    //initialize the controller
    accountsCtrl = $controller('AccountsCtrl', {
      $scope: scope,
      $rootScope : scope
    });
  }));

  fdescribe('when connecting to dashboard', function() {      
    it("should get the user's accounts", function() {
      http.flush();
      expect(scope.accounts.length).toBe(7);
    });
  });
});
