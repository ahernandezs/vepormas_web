'use strict';

angular.module('spaApp')
  .directive('ngAutocomplete', function($parse) {
    return {

      scope: {
        details: '=',
        ngAutocomplete: '=',
        options: '='
      },

      link: function(scope, element, attrs, model) {

        var opts

        var initOpts = function() {
          opts = {}
          if (scope.options) {
            if (scope.options.types) {
              opts.types = []
              opts.types.push(scope.options.types)
            }
            if (scope.options.bounds) {
              opts.bounds = scope.options.bounds
            }
            if (scope.options.country) {
              opts.componentRestrictions = {
                country: scope.options.country
              }
            }
          }
        }
        initOpts()

        var newAutocomplete = function() {
          scope.gPlace = new google.maps.places.Autocomplete(element[0], opts);
          google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
            scope.$apply(function() {
              scope.details = scope.gPlace.getPlace();
              scope.ngAutocomplete = element.val();
            });
          })
        }
        newAutocomplete()

        scope.watchOptions = function () {
          return scope.options
        };
        scope.$watch(scope.watchOptions, function () {
          initOpts()
          newAutocomplete()
          element[0].value = '';
          scope.ngAutocomplete = element.val();
        }, true);
      }
    };
  });
