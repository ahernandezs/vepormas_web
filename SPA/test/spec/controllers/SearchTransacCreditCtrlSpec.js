'use strict';

describe('creditCtrl', function() {
  var creditCtrl, scope, rootScope, http, transactions, mainCtrl, mainScope;

  beforeEach(module('spaApp','mockedCreditTransactions'));

  beforeEach(inject(function($controller, $rootScope, $httpBackend, creditTransJSON) {
    scope = $rootScope.$new();
    // mainScope = $rootScope.$new();
    rootScope = $rootScope;
    http = $httpBackend;
    transactions = creditTransJSON;
    // mainCtrl = $controller('MainCtrl', {
    //   $scope: mainScope
    // });
    creditCtrl = $controller('creditCtrl', {
      $scope: scope
    });
    scope.selectedAcccountId = "0050568032C41EE4A1E123CC55261379-CXN";
    scope.searchParams = {
                          'date_start': "08/05/2015",
                          'date_end': "28/05/2018"                  
                         };
    // mainScope.setServiceError('Búsqueda no realizada: Fecha Inicial y/o Fecha Final NO pueden ser posteriores a la Fecha de Hoy');
  }));

  describe('when search to get transactions between two dates', function() {
    it("should get the transactions response: ", function() {
      // enter in the first fail condition: when the dates are posterior to the "today's date".
      console.log('Condición fallida 1:');
      expect( scope.search ).toThrowError(TypeError, "undefined is not a function");
    });

    it("should get the transactions response: ", function() {
      scope.searchParams.date_start = "18/04/2015";
      scope.searchParams.date_end = "09/04/2015";
      // enter in the second fail condition: when the "start date" is posterior to the "end date".
      console.log('Condición fallida 2:');
      expect( scope.search ).toThrowError(TypeError, "undefined is not a function");
    });

    it("should get the transactions response: ", function() {
      scope.searchParams.date_start = "09/04/2015";
      scope.searchParams.date_end = "18/04/2015";
      // enter in the good condition: getting transaction.
      console.log('Condición correcta:');
      scope.search();
    }); 
  });

});
