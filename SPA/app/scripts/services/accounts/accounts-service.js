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
            options = params.numPage ? options+'&page='+params.numPage : options ;
            options = params.size ? options+'&size='+params.size : options ;

            var search = '';
            search = params.date_start ? search+'date_start='+params.date_start : search ;
            search = params.date_end ? search+'&date_end='+params.date_end : search ;

            options = search !=='' ?options+'&search='+encodeURIComponent(search):options;

            console.log('Sending: '+$rootScope.restAPIBaseUrl+'/accounts/'+accountId+'/transactions?'+options);

			return $http.get($rootScope.restAPIBaseUrl+'/accounts/'+accountId+'/transactions?'+options);
        };

        this.postTransfer = function(sourceAccount, destinationAccount, amount, description, completionDate){
            return $http({
                url: $rootScope.restAPIBaseUrl+'/accounts/'+sourceAccount+'/transactions',
                method: 'POST',
                data: JSON.stringify({
                    'sourceAccount':sourceAccount,
                    'destinationAccount':destinationAccount,
                    'amount':amount,
                    'description':description,
                    'completionDate':completionDate
                })
                ,headers: {'Content-Type': 'application/json','X-AUTH-TOKEN': $http.defaults.headers.common['X-AUTH-TOKEN'] }
            });
        }

}]);
