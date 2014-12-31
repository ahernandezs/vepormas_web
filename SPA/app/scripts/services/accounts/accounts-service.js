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

            options = search !=='' ?options+'&search="'+encodeURIComponent(search)+'"':options;

            console.log('Sending: '+$rootScope.restAPIBaseUrl+'/accounts/'+accountId+'/transactions?'+options);

			return $http.get($rootScope.restAPIBaseUrl+'/accounts/'+accountId+'/transactions?'+options);
        }

}]);
