'use strict';

describe('Unit: PortfolioCtrl, InvestmentCedePrlvCtrl and purchaseRetireVistaCtrl', function() {

    beforeEach(module('spaApp', 'mockedAccounts'));

    // We're going to inject the $controller and the $rootScope
    var portfolioCtrl, cedePRLVCtrl, vistaCtrl, scope, ownAccounts, depositAccounts, vistaAccounts, investmentProducts;

    beforeEach( inject( function($controller, $rootScope) {
        // We create the scope
        scope = $rootScope.$new();
        // We create the controller
        scope.session_token="notEmpty";
        // Load controllers
        portfolioCtrl = $controller('PortfolioCtrl', {
            $scope: scope
        });
        cedePRLVCtrl = $controller('InvestmentCedePrlvCtrl', {
            $scope: scope
        });
        vistaCtrl = $controller('purchaseRetireVistaCtrl', {
            $scope: scope
        });
    }));

    describe('Investments Functionality', function() {
        var http;

        beforeEach( inject( function($httpBackend, accountsJSON) {
            // This will work as our backend
            http = $httpBackend;
            // These will work as our response data
            ownAccounts = accountsJSON;
            depositAccounts = accountsJSON;
            // Actual objects for payment
            scope.payment.account = accounts.accounts[4];
        }));

        it('Should get own and third accounts ', function() {
            http.when('GET', scope.restAPIBaseUrl + '/accounts')
                .respond(
                    200,
                    accounts,
                    {
                        "X-AUTH-TOKEN" : scope.session_token
                    }
                );
            http.when('GET', scope.restAPIBaseUrl + '/products')
                .respond(
                    200,
                    investmentProducts,
                    {
                        "X-AUTH-TOKEN" : scope.session_token
                    }
                );
            // Run the service
            http.flush();

            scope.ownAccounts.push( accounts.accounts );
            scope.theAccounts.push( thirdAccounts.third_accounts );
            expect( scope.theAccounts ).not.toBeUndefined();
            expect( scope.theAccounts.length ).toBeGreaterThan(0);
        });

    });

    /*describe('Transfer Functionality', function() {
        var http;

        beforeEach( inject( function($httpBackend, accountsJSON, thirdAccountsJSON) {
            http = $httpBackend;

            accounts = accountsJSON;
            thirdAccounts = thirdAccountsJSON;
            // Actual objects for transfers
            scope.transfer.account = accounts.accounts[4];
            scope.transfer.destiny = accounts.accounts[5];
        }));

        it('Should send a transfer to a DEP account', function() {
            scope.sendTransfer();
            var jsonBody = JSON.stringify({
                'account_id_destination':scope.transfer.destiny._account_id,
                'amount':100,
                'description':'unit test'
            });

            http.when('POST', scope.restAPIBaseUrl + '/accounts/' + scope.transfer.account._account_id + '/transactions')
                .respond(
                    200,
                    _transaction_id = 000293871802062015113416,
                    {
                        "X-AUTH-TOKEN" : scope.session_token
                    }
                );
            console.log('_transaction_id: ' + _transaction_id);
            expect( _transaction_id ).not.toBe(null);
        });

    });*/

});
