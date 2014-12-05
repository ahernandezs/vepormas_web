'use strict';

var mockModule = angular.module('spaApp');

mockModule.service('mockService', function($http) {
    return {
        checkLogin: function () {

            var obj = {content:null};

            $http.get('checkLogin-response.json').success(function(data) {
        // you can do some processing here
        obj.content = data;
            });
        }
    }
});
