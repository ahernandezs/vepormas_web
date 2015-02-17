'use strict';

angular.module('spaApp')
  .factory('productProvider', ['$q','$rootScope','productService',function ($q, $rootScope, productService) {

    var investmentProducts = null;

    return {
      /**
       * get the investment product-list
       */
      getProductsList: function () {
        var deferred = $q.defer();
        if(! investmentProducts) {
          productService.getProductsList().success(function(data, status, headers) {
            investmentProducts = data.products;
            deferred.resolve(investmentProducts);
          }).error(function(data, status) {
            return deferred.reject('Error getting investment products');
          });
        } else {
          deferred.resolve(investmentProducts);
        }
        return deferred.promise;
      },

      /**
       * get a product rate and duration from its identifier and the amount
       */
      getProductDetail: function(productId, amount){
        var deferred = $q.defer();
        productService.getProductDetail(productId, amount).success(function(data, status, headers){
            deferred.resolve();
        }).error(function(data, status){
            return deferred.reject('Error getting investment product detail');
        })
        return deferred.promise;
      }

    }
  }]);
