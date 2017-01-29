'use strict';

var mDirectives = require('./_mDirectives');

mDirectives.directive('mdTemplateDirective', function () {
    return {
        restrict: 'AEC',
        template: '',
        link: function (scope, element) {
            element;
        }
    };
});

mDirectives.directive('onlyAlphabetsWithSpace', [
    function(){
        return {
             require: 'ngModel',
             link: function(scope, element, attrs, modelCtrl) {
                 modelCtrl.$parsers.push(function (inputValue) {
                     // this next if is necessary for when using ng-required on your input.
                     // In such cases, when a letter is typed first, this parser will be called
                     // again, and the 2nd time, the value will be undefined

                     if (inputValue === undefined) return '' ;
                     var transformedInput = inputValue.replace(/[^a-zA-Z\s]/g, '');
                     if (transformedInput!=inputValue) {
                         modelCtrl.$setViewValue(transformedInput);
                         modelCtrl.$render();
                     }

                     element.bind('blur', function (event) {
                         var fieldValue = element.val();
                         fieldValue = fieldValue.replace(/^\s+|\s+$/g,'');
                         element.val(fieldValue);
                     });

                     return transformedInput;
                 });

             }
        };
    }]);

    mDirectives.directive('onlyDigits', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    });
