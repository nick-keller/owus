(function(){
    'use strict';

    angular.module('owus')
        .service('snackbar', ['$timeout', function($timeout){
            var vm = this;
            vm.messages = [];
            vm.show = false;
            vm.current = null;
            vm.callbacks = [];

            vm.listen = function(cb) {
                vm.callbacks.push(cb);
            };

            vm.emit = function() {
                vm.callbacks.forEach(function(cb) {
                    cb(vm.show, vm.current);
                });
            };

            vm.add = function(message) {
                vm.messages.push(message);

                if(vm.messages.length == 1)
                    vm.next();
            };

            vm.next = function() {
                if(!vm.messages.length) return;

                vm.current = vm.messages[0];
                vm.show = true;
                vm.emit();

                $timeout(function(){
                    vm.show = false;
                    vm.emit();
                    $timeout(function(){
                        vm.messages.splice(0, 1);
                        vm.next();
                    }, 500);
                }, 2000);
            };
        }])
})();