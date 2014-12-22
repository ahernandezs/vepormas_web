'use strict';

/**
 * The credit card controller.
 */
angular.module('spaApp').controller('creditCardCtrl', ['$scope', '$location', '$stateParams', 'accountsProvider', '$rootScope', function ($scope, $location, $stateParams, accountsProvider, $rootScope) {

    accountsProvider.getAccountDetail($stateParams.accountId+'-TDC').then(
      function(data) {
      		$scope.creditsHeader = $rootScope.accounts.credit_card;
      }
    );

}]);
