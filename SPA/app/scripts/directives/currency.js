'use strict';

angular.module('spaApp')
	.directive('currency', function() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attr, ctrl) {

				ctrl.$formatters.push(format);

				ctrl.$parsers.push(function(viewValue) {
					var value = parseFloat(viewValue.replace(/,|\$/g, ''));

					if(value){
						return value;
					}
					return "";
				});

				element.bind("change", function() {
					if( ctrl.$invalid ) return;
					var formattedModel = format(ctrl.$modelValue);
					if( formattedModel !== ctrl.$viewValue ) {
						element.val(formattedModel);
			            if(formattedModel !== '') {
			              element.parent().addClass('selected');
			            } else {
			              element.parent().removeClass('selected');
			            }
					}
				});

				element.bind("focus", function() {

					var value = ctrl.$modelValue

					if(value && value !== '') element.val(value);
				});

				element.bind("blur", function() {
					var formattedModel = format(ctrl.$modelValue);
					element.val(formattedModel);
			          if(formattedModel !== '') {
			            element.parent().addClass('selected');
			          } else {
			            element.parent().removeClass('selected');
			          }
				});

				function format(modelValue) {

					var value = modelValue ? modelValue.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',') : undefined;

					if(value){
						if( value.indexOf(".") != -1 ){
							return value;
						}else{
							return value + '.00';
						}
					}else{
						return "";
					}

				}
			}
		};
});
