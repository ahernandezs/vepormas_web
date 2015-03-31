'use strict';

angular.module('spaApp')
	.directive('currency', function() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attr, ctrl) {

				ctrl.$formatters.push(format);

				ctrl.$parsers.push(function(viewValue) {
					console.log(ctrl);
					if ( !ctrl.$isEmpty(viewValue) ) {
						// it is valid
						var value = parseFloat(viewValue.replace(/,|\$/g, ''));
						console.log( 'parseFloat: ' + value );

						if ( ctrl.$isEmpty(value) || value === 0 ) {
							return undefined;
						}

						ctrl.$setValidity('currency', true);
						var label = element.parent()[0];
						console.log(label.children('type') );
						return value;
					} else {
						// it is invalid, return undefined (no model update)
						ctrl.$setValidity('currency', false);
						return undefined;
					}
				});

				element.bind("change", function() {
					console.log( 'onChange: ' + ctrl.$modelValue );
					console.log( 'ctrl.$error.currency? ' + ctrl.$error.currency );

					if ( ctrl.$error.currency ) return undefined;

					var formattedModel = format(ctrl.$modelValue);
					console.log( 'formattedModel: ' + formattedModel );

					if ( !ctrl.$isEmpty(ctrl.$modelValue) && (formattedModel !== ctrl.$viewValue) ) {
						element.val(formattedModel);
						element.parent().addClass('selected');
					} else {
						element.val(undefined);
						element.parent().removeClass('selected');
					}
				});

				element.bind("focus", function() {
					var value = ctrl.$modelValue;
					console.log( 'onFocus: ' + value);

					if ( value && ctrl.$isEmpty(value) ) {
						element.val(value);
					}
				});

				element.bind("blur", function() {
					var formattedModel = format(ctrl.$modelValue);
					console.log('onBlur: ' + formattedModel);

					if ( !ctrl.$isEmpty(formattedModel) ) {
						element.val(formattedModel);
						element.parent().addClass('selected');
			        } else {
						element.val(undefined);
			            element.parent().removeClass('selected');
			        }
				});

				function format(modelValue) {
					var value = modelValue ? modelValue.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',') : undefined;
					console.log( 'formatting: ' + modelValue );

					if ( !ctrl.$isEmpty(value) ) {
						console.log( 'does it have decimals?' );
						if ( value.indexOf(".") != -1 ) {
							console.log( 'yes: ' + value );
							return '$' + value;
						} else {
							console.log( 'no: ' + value );
							return '$' + value + '.00';
						}
						ctrl.$setValidity('currency', true);
					} else {
						console.log('sorry bro, no valid');
						ctrl.$setValidity('currency', false);
						return undefined;
					}
				};
			}
		};
});
