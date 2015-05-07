'use strict';

describe('Unit: PortfolioCtrl, InvestmentCedePrlvCtrl', function() {

    beforeEach(module('spaApp', 'mockedAccounts', 'mockedProductsInvest', 'mockedcedePRLVResult'));

    // We're going to inject the $controller and the $rootScope
    var portfolioCtrl, cedePRLVCtrl, vistaCtrl, scope, cedePRLVscope;
    var accounts, ownAccounts, depositAccounts, vistaAccounts, products, investmentProducts, cedePRLVResult;
    var $filter;

    beforeEach( inject( function($controller, $rootScope, _$filter_) {
        // We create the scopes
        scope = $rootScope.$new();
        cedePRLVscope = $rootScope.$new();
        // We create the controllers
        scope.session_token="notEmpty";
        cedePRLVscope.session_token="notEmpty";
        // Load controllers
        portfolioCtrl = $controller('PortfolioCtrl', {
            $scope: scope
        });
        cedePRLVCtrl = $controller('InvestmentCedePrlvCtrl', {
            $scope: cedePRLVscope
        });
        // Inject the filter
        $filter = _$filter_;
    }));

    describe('Investments Functionality', function() {
        var http;

        beforeEach( inject( function($httpBackend, accountsJSON, investmentsJSON, cedePRLVJSON) {
            // This will work as our backend
            http = $httpBackend;
            // These will work as our response data
            accounts = accountsJSON;
            depositAccounts = accountsJSON;
            products = investmentsJSON;
            cedePRLVResult = cedePRLVJSON;
            // Actual objects for investment
            cedePRLVscope.investment = {};
            cedePRLVscope.investment.originAccount = accounts.accounts[4];
            cedePRLVscope.investment.destinationProduct = products.products[0];
            //cedePRLVscope.investmentCategory = 'CEDE';
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
            expect( products.investment_vista_allowed ).toBe( true );
        });

        it('Should filter (at least) one DEP account and one VISTA account', function() {
            var account;

            for ( var i = 0; i < accounts.accounts.length; i++ ) {
                account = accounts.accounts[i];
                switch ( account.account_type ) {
                    case 'DEP':
                        account.displayName = account.name + ' ' + account.maskedAccountNumber + ' - ' + account.currency + ': ' + $filter('currency')(account.amount, '$');
                        account.detail = account.name + ' | ' + account.currency + ': ' + $filter('currency')(account.amount, '$');
                        scope.ownAccounts.push( account );
                        scope.depositAccounts.push( account );
                        break;
                    case 'INV':
                        if ( account.category === 'VISTA' ) {
                            account.displayName = account.name + ' ' + account.maskedAccountNumber + ' - ' + account.currency + ': ' + $filter('currency')(account.balance, '$');
                            account.detail = account.name + ' | ' + account.currency + ': ' + $filter('currency')(account.balance, '$');
                            scope.vistaAccounts.push( account );
                        }
                        break;
                    default:
                        break;
                }
            }

            expect( scope.ownAccounts.length ).toBeGreaterThan(0);
            expect( scope.depositAccounts.length ).toBeGreaterThan(0);
            expect( scope.vistaAccounts.length ).toBeGreaterThan(0);
        });

        it('Should set the investment type', function() {
            cedePRLVscope.setInvestmentType('CEDE');
            expect( cedePRLVscope.investmentInstructions ).not.toBeUndefined();

            cedePRLVscope.setInvestmentType('PRLV');
            expect( cedePRLVscope.investmentInstructions ).not.toBeUndefined();
        });

        it('Should do a CEDE investment', function() {
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

        it('Should do a PRLV investment', function() {
            // set up everything for the investment
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

});
