'use strict';

angular.module('spaApp').service('checksService', ['$http', function($http){

this.getCheckAccounts = function(){
return $http.get('/scripts/services/check_accounts.js');	
}

}]);
