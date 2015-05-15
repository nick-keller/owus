(function(){
    'use strict';

    angular.module('owus')
        .controller('editController', ['user', 'Expense', '$state', 'snackbar', function(user, Expense, $state, snackbar){
            var vm = this;

            vm.actionName = 'Editer';

            vm.expense = Expense.get({id:$state.params.id});

            vm.submit = function($event) {
                $event.preventDefault();

                vm.expense.$edit(function(){
                    snackbar.add('Bien mis à jour !');
                    $state.go('home');
                });
            };
        }])
})();