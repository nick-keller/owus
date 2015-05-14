(function(){
    'use strict';

    angular.module('owus')
        .controller('userSelectorController', ['friends', '$scope', function(friends, $scope){
            var vm = this;

            vm.multiple = vm.multiple ? true : vm.model ?
                vm.model.length !== undefined :
                false;

            if(vm.users === undefined)
                vm.friends = friends.getAll();
            else
                vm.friends = vm.users;

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

            $scope.$watch(function(scope){return scope.ctrl.model;}, function(user){
                if(!user) return;

                if(!user.length)
                    vm.select(user);
                else {
                    vm.selectedUsers = user;
                    vm.multiple = true;
                }
            });
        }])
        .directive('userSelector', [function() {
            return {
                restrict: 'E',
                templateUrl: 'components/UserSelector.html',
                scope: {
                    model: '=',
                    placeholder: '@',
                    users: '='
                },
                controller: 'userSelectorController',
                controllerAs: 'ctrl',
                bindToController: true
            };
        }]);
})();