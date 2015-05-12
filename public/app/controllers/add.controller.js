(function(){
    'use strict';

    angular.module('owus')
        .controller('addController', ['user', function(user){
            var vm = this;

            vm.expense = {
                title: null,
                amount: null,
                payer: user,
                recipients: [user]
            };

            vm.submit = function($event) {
                $event.preventDefault();
            };
        }])
})();