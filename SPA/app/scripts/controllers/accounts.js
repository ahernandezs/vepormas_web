'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('AccountsCtrl', function ($scope,$http,$location, accountsProvider) {
  accountsProvider.getAccounts();
});
