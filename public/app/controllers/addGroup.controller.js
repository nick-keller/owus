(function(){
    'use strict';

    angular.module('owus')
        .controller('addGroupController', ['user', 'Group', '$state', 'snackbar', function(user, Group, $state, snackbar){
            var vm = this;

            vm.actionName = 'Ajouter';

            vm.group = new Group({
                name: null,
                users: [user]
            });

            vm.submit = function() {
                vm.group.$save(function(){
                    $state.go('transfer');
                    snackbar.add("C'est noté !");
                });
            };
        }])
})();