'use strict';

/**
 * api initializer factory
 */

angular.module('spaApp')
    .service('accountsService', ['$http','$rootScope', function ($http, $rootScope) {

		this.getAccounts = function () {
            return $http.get($rootScope.restAPIBaseUrl+'/accounts');
        };

        this.getAccountsDetail = function (accountId) {
            return $http.get($rootScope.restAPIBaseUrl+'/accounts/'+accountId);
        };

        this.getTransactions = function(accountId, params) {

            var options = '';
            var optionsParams = [];
            params.numPage ? optionsParams.push('page=' + params.numPage) : '';
            params.size ? optionsParams.push('size=' + params.size) : '';

            var search = '';
            var searchParams = [];
            var startDate = $.datepicker.formatDate("yy-mm-dd", params.date_start);
            var endDate = $.datepicker.formatDate("yy-mm-dd", params.date_end);
            params.date_start? searchParams.push('date_start=' + startDate) : '';
            params.date_end? searchParams.push('date_end=' + endDate) : '';
            params.previousPeriod? searchParams.push('previous_period=true') : '';
            searchParams.length > 0 ? optionsParams.push('search=' + encodeURIComponent(searchParams.join('&'))) : '';

            options = optionsParams.length > 0 ? '?' + optionsParams.join('&') : '';

            console.log('Sending: '+$rootScope.restAPIBaseUrl+'/accounts/'+accountId+'/transactions' + options);

            return $http.get($rootScope.restAPIBaseUrl+'/accounts/'+accountId+'/transactions' + options);
        };

        this.postTransfer = function(sourceAccount, destinationAccount, amount, description, completionDate){
            return $http({
                url: $rootScope.restAPIBaseUrl+'/accounts/'+sourceAccount+'/transactions',
                method: 'POST',
                data: JSON.stringify({
                    'account_id_destination':destinationAccount,
                    'amount':amount,
                    'description':description,
                    'completion_date':completionDate
                })
                ,headers: {'Content-Type': 'application/json','X-AUTH-TOKEN': $http.defaults.headers.common['X-AUTH-TOKEN'] }
            });
        }

        this.getStates = function(accountId){
            console.log($rootScope.restAPIBaseUrl+'/accounts/'+accountId+'/states');
            return $http.get($rootScope.restAPIBaseUrl+'/accounts/'+accountId+'/states');
        }

        this.getState = function(accountId, id, format){
            console.log($rootScope.restAPIBaseUrl+'/files/statement?format='+format+'&id='+id+'&_account_id='+accountId);
            return $http.get($rootScope.restAPIBaseUrl+'/files/statement?format='+format+'&id='+id+'&_account_id='+accountId);
        }

}]);
