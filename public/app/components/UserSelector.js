(function(){
    'use strict';

    angular.module('owus')
        .controller('userSelectorController', ['friends', function(friends){
            var vm = this;

            vm.multiple = vm.model !== undefined ?
                vm.model.length !== undefined :
                false;
            vm.friends = friends.getAll();
            vm.selectedUsers = vm.multiple ? vm.model : !vm.model ? [] : [vm.model];
            vm.selecting = false;

            vm.select = function(user) {
                if(vm.multiple) {
                    if(~vm.indexOfUser(user))
                        vm.selectedUsers.splice(vm.indexOfUser(user), 1);
                    else
                        vm.selectedUsers.push(user);

                    vm.model = vm.selectedUsers;
                } else {
                    vm.selectedUsers = [user];
                    vm.selecting = false;
                    vm.model = user;
                }
            };

            vm.isEmpty = function() {
                return !vm.selectedUsers.length;
            };

            vm.isSelected = function(user) {
                return ~vm.indexOfUser(user);
            };

            vm.indexOfUser = function(user) {
                for(var i=0; i < vm.selectedUsers.length; ++i) {
                    if(vm.selectedUsers[i].name == user.name)
                        return i;
                }
                return -1;
            };
        }])
        .directive('userSelector', [function() {
            return {
                restrict: 'E',
                templateUrl: 'components/UserSelector.html',
                scope: {
                    model: '=',
                    placeholder: '@'
                },
                controller: 'userSelectorController',
                controllerAs: 'ctrl',
                bindToController: true
            };
        }]);
})();