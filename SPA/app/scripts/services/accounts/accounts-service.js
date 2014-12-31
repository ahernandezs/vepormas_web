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
            options = params.size ? options+'&size='+params.numPage : options ;
            options = params.date_start ? options+'&date_start='+params.date_start : options ;
            options = params.date_end ? options+'&date_start='+params.date_end : options ;

            console.log('Enviando: '+$rootScope.restAPIBaseUrl+'/accounts/'+accountId+'/transactions?'+options);

			return $http.get($rootScope.restAPIBaseUrl+'/accounts/'+accountId+'/transactions?'+options);
        }

}]);
