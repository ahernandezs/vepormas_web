'use strict';

/**
 * The accounts controller. Gets accounts passing auth parameters
 */
angular.module('spaApp').controller('InvestmentsCtrl', ['$scope', '$location', function ($scope, $location) {
  //TODO: temporal binding
  $scope.completeName = 'ABEL BECERRA CASTRO';
  $scope.date = '17/05/2014';
  $scope.time = '23:34:54';

  $scope.showAccountHeader = true;

  $scope.accountHeader = {'cutDate':'29/Oct/2014',
              'minimumPayment':'760.00',
              'totalPayment':'2,123.00',
              'limitDate':'15/Oct/2014',
              'limitPayment':'760.00',
              'cutBalance':'2,123.00',
              'currentBalance':'2,123.00',
              'noInterest':'1,520.00',
              'dueCurrent':'0.00',
              'limitCredit':'5,000.00',
              'availableCredit':'3,000.00'};

  /**
    Function for logout application
  **/
  $scope.logout = function() {
  $location.path('/login');
  }

}]);
