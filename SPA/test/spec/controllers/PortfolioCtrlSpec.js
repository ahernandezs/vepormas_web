'use strict';

describe('Unit: PortfolioCtrl, InvestmentCedePrlvCtrl', function() {

    beforeEach(module('spaApp', 'mockedAccounts', 'mockedProductsInvest', 'mockedInvestmentResult'));

    // We're going to inject the $controller and the $rootScope
    var portfolioCtrl, cedePRLVCtrl, vistaCtrl, scope, cedePRLVscope, vistaScope, code;
    var accounts, ownAccounts, depositAccounts, vistaAccounts, products, investmentProducts, cedePRLVResult, vistaResult;
    var $filter;

    beforeEach( inject( function($controller, $rootScope, _$filter_) {
        // We create the scopes
        scope = $rootScope.$new();
        cedePRLVscope = $rootScope.$new();
        vistaScope = $rootScope.$new();

        // We create the controllers
        scope.session_token="notEmpty";
        cedePRLVscope.session_token="notEmpty";
        vistaScope.session_token="notEmpty";

        // Load controllers
        portfolioCtrl = $controller('PortfolioCtrl', {
            $scope: scope
        });
        cedePRLVCtrl = $controller('InvestmentCedePrlvCtrl', {
            $scope: cedePRLVscope
        });
        vistaCtrl = $controller('purchaseRetireVistaCtrl', {
            $scope: vistaScope
        });

        // Inject the filter
        $filter = _$filter_;
    }));

    describe('CEDE and PRLV Investments Functionality', function() {
        var http;

        beforeEach( inject( function($httpBackend, accountsJSON, investmentsJSON, resultJSON) {
            // This will work as our backend
            http = $httpBackend;

            // These will work as our response data
            accounts = accountsJSON;
            products = investmentsJSON;
            cedePRLVResult = resultJSON;

            // Actual objects for investment
            cedePRLVscope.investment = {};
            cedePRLVscope.investment.originAccount = accounts.accounts[4];
            cedePRLVscope.investment.destinationProduct = products.products[0];
        }));

        it('Should get own accounts and products', function() {
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
                    products,
                    {
                        "X-AUTH-TOKEN" : scope.session_token
                    }
                );
            // Run the service
            http.flush();

            scope.ownAccounts.push( accounts.accounts );
            scope.investmentProducts.push( products.products );

            expect( scope.ownAccounts ).not.toBeUndefined();
            expect( scope.investmentProducts ).not.toBeUndefined();
            expect( products.investment_cede_allowed ).toBe( true );
            expect( products.investment_prlv_allowed ).toBe( true );
        });

        it('Should filter at least one DEP account', function() {
            var account;

            for ( var i = 0; i < accounts.accounts.length; i++ ) {
                account = accounts.accounts[i];
                if ( account.account_type === 'DEP' ) {
                    account.displayName = account.name + ' ' + account.maskedAccountNumber + ' - ' + account.currency + ': ' + $filter('currency')(account.amount, '$');
                    account.detail = account.name + ' | ' + account.currency + ': ' + $filter('currency')(account.amount, '$');
                    scope.ownAccounts.push( account );
                }
            }

            expect( scope.ownAccounts.length ).toBeGreaterThan(0);
        });

        it('Should set the investment type', function() {
            cedePRLVscope.setInvestmentType('CEDE');
            expect( cedePRLVscope.investmentInstructions ).not.toBeUndefined();

            cedePRLVscope.setInvestmentType('PRLV');
            expect( cedePRLVscope.investmentInstructions ).not.toBeUndefined();
        });

        it('Should make a CEDE investment', function() {
            // set up everything for the investment
            cedePRLVscope.goToConfirmation();
            cedePRLVscope.setInvestmentType('CEDE');
            cedePRLVscope.investment.expirationInstruction = cedePRLVscope.investmentInstructions;

            cedePRLVscope.investmentCategory = ( products.investment_cede_allowed ) ? 'CEDE': null;
            cedePRLVscope.launchInvestment();

            http.when('GET', scope.restAPIBaseUrl + '/accounts' + cedePRLVscope.investment.originAccount._account_id + '/transactions')
                .respond(
                    200,
                    cedePRLVResult,
                    {
                        "X-AUTH-TOKEN" : scope.session_token
                    }
                );

            expect( cedePRLVResult ).not.toBeUndefined();
        });

        it('Should make a PRLV investment', function() {
            cedePRLVscope.investment.destinationProduct = products.products[4];
            cedePRLVscope.goToConfirmation();
            cedePRLVscope.setInvestmentType('PRLV');
            cedePRLVscope.investment.expirationInstruction = cedePRLVscope.investmentInstructions;

            cedePRLVscope.investmentCategory = ( products.investment_prlv_allowed ) ? 'PRLV': null;
            cedePRLVscope.launchInvestment();

            http.when('GET', scope.restAPIBaseUrl + '/accounts' + cedePRLVscope.investment.originAccount._account_id + '/transactions')
                .respond(
                    200,
                    cedePRLVResult,
                    {
                        "X-AUTH-TOKEN" : scope.session_token
                    }
                );

            expect( cedePRLVResult ).not.toBeUndefined();
        });

    });

    describe('VISTA Investments Functionality', function() {
        var http;

        beforeEach( inject( function($httpBackend, accountsJSON, investmentsJSON, resultJSON) {
            http = $httpBackend;
            accounts = accountsJSON;
            depositAccounts = accountsJSON;
            products = investmentsJSON;
            vistaResult = resultJSON;
        }));

        it('Should get own accounts and products', function() {
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
                    products,
                    {
                        "X-AUTH-TOKEN" : scope.session_token
                    }
                );
            // Run the service
            http.flush();

            scope.depositAccounts.push( accounts.accounts );
            scope.investmentProducts.push( products.products );

            expect( scope.depositAccounts ).not.toBeUndefined();
            expect( scope.investmentProducts ).not.toBeUndefined();
            expect( products.investment_vista_allowed ).toBe( true );
        });

        it('Should filter at least one DEP account and one VISTA', function() {
            var account;

            for ( var i = 0; i < accounts.accounts.length; i++ ) {
                account = accounts.accounts[i];
                if ( account.account_type === 'DEP' ) {
                    account.displayName = account.name + ' ' + account.maskedAccountNumber + ' - ' + account.currency + ': ' + $filter('currency')(account.amount, '$');
                    account.detail = account.name + ' | ' + account.currency + ': ' + $filter('currency')(account.amount, '$');
                    //scope.ownAccounts.push( account );
                    scope.depositAccounts.push( account );
                } else if ( account.account_type === 'INV' && account.category === 'VISTA' ) {
                    account.displayName = account.name + ' ' + account.maskedAccountNumber + ' - ' + account.currency + ': ' + $filter('currency')(account.balance, '$');
                    account.detail = account.name + ' | ' + account.currency + ': ' + $filter('currency')(account.balance, '$');
                    scope.vistaAccounts.push( account );
                }
            }

            expect( scope.depositAccounts.length ).toBeGreaterThan(0);
            expect( scope.vistaAccounts.length ).toBeGreaterThan(0);
        });

        it('Should make a VISTA investment', function() {
            vistaScope.investment.vistaAccount = accounts.accounts[3];
            vistaScope.investment.depositAccount = depositAccounts.accounts[4];
            vistaScope.investment.amount = 100;

            vistaScope.purchaseInvestment();

            http.when('GET', scope.restAPIBaseUrl + '/accounts' + vistaScope.investment.depositAccount._account_id + '/transactions')
                .respond(
                    200,
                    vistaResult,
                    {
                        "X-AUTH-TOKEN" : scope.session_token
                    }
                );

            expect( vistaResult ).not.toBeUndefined();
        });

        it('Should make a withdrawal from a VISTA investment', function() {
            vistaScope.investment.depositAccount = depositAccounts.accounts[4];
            vistaScope.investment.vistaAccount = accounts.accounts[3];
            vistaScope.investment.amount = 100;

            vistaScope.retireInvestment();

            http.when('GET', scope.restAPIBaseUrl + '/accounts' + vistaScope.investment.vistaAccount._account_id + '/transactions')
                .respond(
                    code = 200,
                    {
                        "X-AUTH-TOKEN" : scope.session_token
                    }
                );

            expect( code ).toEqual( 200 );
        });

    });

});
