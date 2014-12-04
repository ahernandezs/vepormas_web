'use strict';

var mockModule = angular.module('spaApp');

mockModule.service('mockService', function($http, $q) {
    var _this = this;

    this.promiseToHaveData = function() {
        var defer = $q.defer();

        $http.get('checkLogin-response.json')
            .success(function(data) {
                angular.extend(_this, data);
                defer.resolve();
            })
            .error(function() {
                defer.reject('could not find someFile.json');
            });

        return defer.promise;
    }
});
