(function(){
    'use strict';

    angular.module('owus')
        .controller('editGroupController', ['user', 'Group', '$state', 'snackbar', function(user, Group, $state, snackbar){
            var vm = this;

            vm.actionName = 'Editer';

            vm.group = Group.get({id:$state.params.id});

            vm.submit = function() {
                vm.group.$edit(function(){
                    $state.go('transfer');
                    snackbar.add("C'est fait !");
                });
            };
        }])
})();