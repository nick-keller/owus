(function(){
    'use strict';

    angular.module('owus')
        .directive('money', [function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ngModelCtrl){
                    var clean = function($this) {
                        var val = ngModelCtrl.$viewValue + '';

                        val = val.replace(',', '.');
                        val = val.replace(' ', '');

                        if(val.match(/^-?\d+$/))
                            val = val + '.00';
                        else if(val.match(/^\.\d$/))
                            val = '0' + val + '0';
                        else if(val.match(/^\.\d{2}$/))
                            val = '0' + val;
                        else if(val.match(/^$/))
                            val = '0.00';
                        else if(val.match(/^-?\d+\.$/))
                            val = val + '00';
                        else if(val.match(/^-?\d+\.\d$/))
                            val = val + '0';
                        else if(!val.match(/^-?\d+\.\d{2}$/))
                            val = '0.00';

                        $this.val(val);
                        ngModelCtrl.$setViewValue(parseFloat(val), 'blur');
                    };

                    element.on('blur', function(){
                        var $this = $(this);
                        clean($this);
                    }).focus(function(){
                        var $this = $(this);
                        var val = $this.val();

                        if(val == '0.00')
                            val = '';
                        else if(val.match(/^-?\d+\.00$/))
                            val = val.replace('.00', '');

                        $this.val(val);
                    });

                    scope.$watch(attrs.ngModel, function(){
                        if(!element.is(":focus"))
                            clean(element);
                    })
                }
            };
        }]);
})();