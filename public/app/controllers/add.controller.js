(function(){
    'use strict';

    angular.module('owus')
        .controller('addController', ['user', 'Expense', '$state', function(user, Expense, $state){
            var vm = this;

            vm.actionName = 'Ajouter';

            vm.expense = new Expense({
                title: null,
                amount: null,
                payer: user,
                recipients: [user]
            });

            vm.submit = function($event) {
                $event.preventDefault();

                vm.expense.$save(function(){
                    $state.go('home');
                });
            };
        }])
})();