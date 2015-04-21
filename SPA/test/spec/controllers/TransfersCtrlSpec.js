'use strict';

describe('Unit: TransfersCtrl', function() {

    beforeEach(module('spaApp', 'mockedAccounts'));

    // We're going to inject the $controller and the $rootScope
    var ctrl, scope, accounts;

    beforeEach( inject( function($controller, $rootScope) {
        // We create the scope
        scope = $rootScope.$new();
        // We create the controller
        //scope.restAPIBaseUrl = '123456';
        scope.session_token="notEmpty";
        ctrl = $controller('TransfersCtrl', {
            $scope: scope
        });
    }));

    fdescribe("Let's try getting the accounts", function() {
        var http;

        beforeEach( inject( function($httpBackend, accountsJSON) {
            // This will work as our backend
            http = $httpBackend;
            accounts = accountsJSON;
        }));

        // first test
        it('Are there own accounts?', function() {
            http.when('GET', scope.restAPIBaseUrl + '/accounts')
            .respond(
              200,
              accounts,
              {
                "X-AUTH-TOKEN" : scope.session_token
              }
            );
            /*http.when('GET', scope.restAPIBaseUrl + '/externalaccounts')
            .respond(
              200,
              accounts,
              {
                "X-AUTH-TOKEN" : scope.session_token
              }
          );*/
            http.flush();
            expect( scope.theAccounts ).not.toBeUndefined();
            console.log('aca estamos');
            console.log( scope.theAccounts );
        });
    });

});
