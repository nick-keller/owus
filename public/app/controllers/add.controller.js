(function(){
    'use strict';

    angular.module('owus')
        .controller('addController', ['user', 'Expense', '$state', function(user, Expense, $state){
            var vm = this;

            vm.expense = new Expense({
                title: null,
                amount: null,
                payer: user,
                recipients: [user]
            });

            vm.submit = function($event) {
                $event.preventDefault();

                vm.expense.$add(function(){
                    $state.go('home');
                });
            };
        }])
})();