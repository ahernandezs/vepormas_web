'use strict';

describe('AccountsCtrl', function() {
  
  var accountsCtrl, dashboardCtrl, mainCtrl, scope, http, accounts, location;

  beforeEach(module('spaApp','mockedAccounts'));

  beforeEach(inject(function($controller, $rootScope, $httpBackend, $location, accountsJSON) {
    scope = $rootScope.$new();
    http = $httpBackend;
    location = $location;
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

  /**
   * the the service success
   */
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

  /**
   * the the service failure
   */
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


  /**
   * test the selectAccount method
   */
  describe('when selecting an account...', function() {

    var creditCardAccount, investmentAccount, depositAccount, creditAccount;

    beforeEach(function(){
      http.when('GET', scope.restAPIBaseUrl + '/accounts')
        .respond(
          200,
          accounts,
          {
            "X-AUTH-TOKEN" : scope.session_token
          }
      );
      http.flush();
      for(var i=0 ;i < scope.accounts.length ; i++){
          switch(scope.accounts[i].account_type){
              case 'TDC' : creditCardAccount = scope.accounts[i]; break;
              case 'INV' : investmentAccount = scope.accounts[i]; break;
              case 'DEP' : depositAccount = scope.accounts[i]; break;
              case 'CXN' : creditAccount = scope.accounts[i]; break;
          }
      }
    });

    it("type of TDC, should go the the TDC location", function() {
      scope.selectAccount(creditCardAccount);
      expect(location.path()).toBe('/accounts/'+creditCardAccount._account_id+'/tdc');
    });

    it("type of INV, should go the the INV location", function() {
      scope.selectAccount(investmentAccount);
      expect(location.path()).toBe('/accounts/'+investmentAccount._account_id+'/investment');
    });

    it("type of DEP, should go the the DEP location", function() {
      scope.selectAccount(depositAccount);
      expect(location.path()).toBe('/accounts/'+depositAccount._account_id+'/deposit');
    });

    it("type of CXN, should go the the CXN location", function() {
      scope.selectAccount(creditAccount);
      expect(location.path()).toBe('/accounts/'+creditAccount._account_id+'/credit');
    });
  });

  


  //to prevent the confirmation message when closing the windows
  afterEach(inject(function($rootScope) {
    $rootScope.session_token=null;
  }));
   
});
