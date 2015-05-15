(function(){
    'use strict';

    angular.module('owus')
        .controller('tabsController', ['$parse', '$scope', function($parse, $scope){
            var vm = this;

            vm.selection = null;
            var scope = $scope.$parent;

            vm.isSelected = function(key) {
                if(vm.selection === null)
                    vm.select(key);

                return vm.selection == key;
            };

            vm.select = function(key) {
                vm.selection = key;
                scope.$key = key;
                $parse(vm.onChange)(scope);
            };

            if(vm.control !== undefined) {
                vm.control.select = function(key) {
                    vm.select(key);
                }
            }
        }])
        .directive('tabs', [function() {
            return {
                restrict: 'E',
                templateUrl: 'components/Tabs.html',
                controller: 'tabsController',
                controllerAs: 'ctrl',
                scope: {
                    tabs: '=',
                    onChange: '@change',
                    control: '='
                },
                bindToController: true,
                link: function(scope, element, attrs){
                    var $slider = element.find('.current');
                    var $win = $(window);

                    scope.$watch('ctrl.selection', function(key){
                        if(key === null) return;

                        var $new = element.find('[data-key=' + key + ']');

                        if($new.position().left < $slider.position().left)
                            $slider.addClass('left');
                        else
                            $slider.removeClass('left');

                        $slider.css('left', $new.position().left + 'px');
                        $slider.css('right', $win.width() - $new.position().left - $new.outerWidth() + 'px');
                    });
                }
            };
        }]);
})();