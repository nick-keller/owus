(function(){
    'use strict';

    angular.module('owus')
        .controller('groupController', ['user', function(user){
            var vm = this;

            vm.showMembers = false;
            vm.deployed = false;
            vm.showTransfer = false;

            vm.lengthMessage = function() {
                if(vm.group.users.length == 2)
                    return '<i class="md md-apps"></i> 2';
                if(vm.group.users.length == 3)
                    return '<i class="md md-apps"></i>';
                return '+' + (vm.group.users.length -3);
            };

            vm.userOwnsGroup = function() {
                return vm.userDebt() > 0;
            };

            vm.userDebt = function() {
                for(var i=0; i<vm.group.users.length; ++i) {
                    if(vm.group.users[i].facebookId == user.facebookId)
                        return vm.group.users[i].debt;
                }
                return 0;
            };

            vm.userAbsDebt = function() {
                return Math.abs(vm.userDebt());
            };

            vm.isFromGroup = function(u) {
                for(var i=0; i<vm.group.users.length; ++i) {
                    if(vm.group.users[i].facebookId == u.facebookId)
                        return true;
                }
                return false;
            };

            vm.oldDebts = [];
            vm.newDebts = [];

            (function calculateOldDebts(){
                for(var facebookId in vm.debts) {
                    if (!vm.debts.hasOwnProperty(facebookId)) continue;

                    var u = null;

                    for(var i=0; i<vm.group.users.length; ++i) {
                        if(vm.group.users[i].facebookId == facebookId) {
                            u = vm.group.users[i];
                            break;
                        }
                    }

                    if(u === null) continue;

                    vm.debts[facebookId].forEach(function(debt){
                        if(debt.amount > 0 && vm.isFromGroup(debt.user))
                            vm.oldDebts.push({
                                from: u,
                                to: debt.user,
                                amount: debt.amount
                            })
                    });
                }
            })();

            (function calculateNewDebts(){
                var users = [];

                vm.group.users.forEach(function(user){
                    users.push({
                        name: user.name,
                        facebookId: user.facebookId,
                        profileUrl: user.profileUrl,
                        debt: user.debt
                    });
                });

                var givers = users.filter(function(user){
                    return user.debt > 0;
                }).sort(function(u1, u2){
                    return u1.debt == u2.debt ? 0 : u1.debt > u2.debt ? -1 : 1;
                });

                var receivers = users.filter(function(user){
                    return user.debt < 0;
                }).sort(function(u1, u2){
                    return u1.debt == u2.debt ? 0 : u1.debt > u2.debt ? 1 : -1;
                });

                var i = 0, j = 0;

                while(i < givers.length && givers[i].debt > 0) {
                    if(givers[i].debt == -receivers[j].debt) {
                        vm.newDebts.push({
                            from: givers[i],
                            to: receivers[j],
                            amount: givers[i].debt
                        });
                        i++;
                        j++;
                    } else if(givers[i].debt > -receivers[j].debt) {
                        vm.newDebts.push({
                            from: givers[i],
                            to: receivers[j],
                            amount: -receivers[i].debt
                        });
                        givers[i].debt += receivers[i].debt;
                        j++;
                    } else {
                        vm.newDebts.push({
                            from: givers[i],
                            to: receivers[j],
                            amount: givers[i].debt
                        });
                        receivers[i].debt += givers[i].debt;
                        i++;
                    }
                }
            })();
        }])
        .directive('group', [function() {
            return {
                restrict: 'E',
                templateUrl: 'components/Group.html',
                controller: 'groupController',
                controllerAs: 'ctrl',
                scope: {
                    group: '=',
                    debts: '='
                },
                bindToController: true
            };
        }]);
})();