(function(){
    'use strict';

    angular.module('owus')
        .controller('groupController', ['user', 'Expense', '$state', 'snackbar', function(user, Expense, $state, snackbar){
            var vm = this;

            vm.showMembers = false;
            vm.deployed = false;
            vm.showTransfer = false;

            vm.lengthMessage = function() {
                if(vm.group.users.length == 2)
                    return '<i class="md md-person"></i> 2';
                if(vm.group.users.length == 3)
                    return '<i class="md md-person"></i>';
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

            vm.transfer = function() {
                var delta = [];

                var eq = function(u1, u2) {
                    return u1.facebookId == u2.facebookId;
                };

                var getNewDebt = function(oldDebt) {
                    for(var i=0; i<vm.newDebts.length; ++i) {
                        var newDebt = vm.newDebts[i];

                        if(eq(newDebt.from, oldDebt.from) && eq(newDebt.to, oldDebt.to)) {
                            vm.newDebts.splice(i, 1);
                            i--;

                            if(newDebt.amount == oldDebt.amount) return null;

                            if(newDebt.amount > oldDebt.amount) {
                                return {
                                    payer: newDebt.to,
                                    receiver: newDebt.from,
                                    amount: newDebt.amount - oldDebt.amount
                                };
                            } else {
                                return {
                                    payer: newDebt.from,
                                    receiver: newDebt.to,
                                    amount: oldDebt.amount - newDebt.amount
                                };
                            }
                        }

                        if(eq(newDebt.from, oldDebt.to) && eq(newDebt.to, oldDebt.from)) {
                            vm.newDebts.splice(i, 1);
                            i--;

                            return {
                                payer: newDebt.to,
                                receiver: newDebt.from,
                                amount: newDebt.amount + oldDebt.amount
                            };
                        }
                    }

                    return {
                        payer: oldDebt.from,
                        receiver: oldDebt.to,
                        amount: oldDebt.amount
                    };
                };

                vm.oldDebts.forEach(function(debt) {
                    var d = getNewDebt(debt);

                    if(d)
                        delta.push(d);
                });

                vm.newDebts.forEach(function(debt) {
                    delta.push({
                        payer: debt.to,
                        receiver: debt.from,
                        amount: debt.amount
                    });
                });

                var counter = delta.length;

                delta.forEach(function(d) {
                    var expense = new Expense({
                        title: 'Transfert',
                        amount: d.amount,
                        payer: d.payer,
                        recipients: [d.receiver]
                    });

                    expense.$save(function() {
                        if(--counter === 0) {
                            $state.go('home');
                            snackbar.add("Les dettes ont bien été transférées !");
                        }
                    });
                })
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