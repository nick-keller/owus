(function(){
    'use strict';

    angular.module('owus')
        .controller('editController', ['user', 'Expense', '$state', function(user, Expense, $state){
            var vm = this;

            vm.actionName = 'Editer';

            vm.expense = Expense.get({id:$state.params.id});

            vm.submit = function($event) {
                $event.preventDefault();

                vm.expense.$edit(function(){
                    $state.go('home');
                });
            };
        }])
})();