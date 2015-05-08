'use strict';
 
 describe('AdminCtrl', function() {
  console.log("AdminCtrl Test");  
  var adminCtrl, dashboardCtrl, scope, http, limit, location, thirdAccount, useractivity;
 
  beforeEach(module('spaApp','mockedLimits','mockedThirdAccounts','mockedUserActivity', 'mockedBeneficiary'));

  describe("When getting beneficiaries",function(){
    beforeEach(inject(function($controller, $rootScope, $httpBackend, beneficiaryJSON){
      scope = $rootScope.$new();
      http = $httpBackend;
      beneficiaries = beneficiaryJSON;
    }));
  });
 	
 	describe("When get a limit",function(){
 		beforeEach(inject(function($controller, $rootScope, $httpBackend, $location,limitsJSON, thirdAccountsJSON, userActivityJSON) {	
 		//console.log("json "  JSON.stringify(userActivityJSON));	
 		scope = $rootScope.$new();
 		http = $httpBackend;
 		$rootScope.session_token="notEmpty";
 		limit = limitsJSON; 
 		thirdAccount = thirdAccountsJSON;
 		useractivity = userActivityJSON;
 	 	adminCtrl = $controller('AdminCtrl', {
 	  	 $scope: scope
 	 	});		
 	 }));
 
  describe('When getting beneficiaries', function(){
    it('get beneficiaries', function(){

        http.when('GET', scope.restAPIBaseUrl   + '/accounts/limits')
            .respond(
            200,
            limit,
            {
              "X-AUTH-TOKEN" : scope.session_token
            }
          );
    });
  });

 	describe('When is a set limit', function(){
    console.log("Testing admin.js");
 		it("setLimits",function(){
        http.when('GET', scope.restAPIBaseUrl   + '/accounts/limits')
 		      	.respond(
 		        200,
 		        limit,
 		        {
 		          "X-AUTH-TOKEN" : scope.session_token
 		        }
 	        );
 		     http.when('GET', scope.restAPIBaseUrl   + '/accounts/limits')
 		      	.respond(		       
        			 503,  {"code":300, "message" : "technical error"},
       			 limit,
 		        {
 		          "X-AUTH-TOKEN" : scope.session_token
 		        }       
      		 );
 		      http.when('POST', scope.restAPIBaseUrl  +  '/accounts/limits')
 		      	.respond(
 		        200,
 		        limit,
 		        {
 		          "X-AUTH-TOKEN" : scope.session_token
 		        }
 	        );
 	      	http.when('GET', scope.restAPIBaseUrl  +  '/externalaccounts')
 		      	.respond(
 		        200,
 		        thirdAccount,
 		        {
 		          "X-AUTH-TOKEN" : scope.session_token
 	            }
 	       );
 	       http.when('GET', scope.restAPIBaseUrl   + '/useractivity')
 		      	.respond(
 		        200,
 		        useractivity,
 		        {
 		          "X-AUTH-TOKEN" : scope.session_token
 	            }
 	       );
 		   http.flush();
 	   	for(var i=0 ;i < scope.limits.length; i++){     	 	
      	 	scope.setLimits(1200, 'C', 123569);
      	 	http.flush();
      	 	var amount =scope.limits[1].amount;
      	 	expect(amount).toBe('8000.0');  	
      	 }
 	  });
 	});//end descrie when is a set limit
 });//end function describe When get a limit
 });//End main test function
