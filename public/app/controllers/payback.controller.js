(function(){
    'use strict';

    angular.module('owus')
        .controller('paybackController', ['$http', 'user', '$scope', '$state', 'Expense', 'snackbar', function($http, user, $scope, $state, Expense, snackbar){
            var vm = this;

            var indexOfUser = function(u){
                if(!u) return -1;

                for(var i=0; i<vm.debts.length; ++i){
                    if(vm.debts[i].user.facebookId !== u.facebookId)
                        continue;

                    return i;
                }
                return -1;
            };

            vm.user = user;
            vm.debts = [];
            vm.users = {
                give: [],
                receive: []
            };

            vm.payback = {
                receive: false,
                user: null,
                amount: null
            };

            vm.tabCtrl = {};

            $http.get('/me/debts').success(function(data) {
                vm.debts = data;

                data.forEach(function(debt){
                    if(debt.amount > 0)
                        vm.users.give.push(debt.user);
                    else if(debt.amount < 0)
                        vm.users.receive.push(debt.user);
                });

                if($state.params.facebookId) {
                    var i = indexOfUser({facebookId:$state.params.facebookId});

                    if(~i) {
                        vm.payback.user = vm.debts[i].user;
                        vm.payback.receive = vm.debts[i].amount < 0;
                        vm.tabCtrl.select(vm.payback.receive ? 'receive' : 'give');
                    }
                }
            });

            $scope.$watch(function(scope){return scope.paybackCtrl.payback.user;}, function(user){
                if(!user) return;

                var i = indexOfUser(user);

                if(!~i) return;

                if(vm.payback.receive ? vm.debts[i].amount < 0 : vm.debts[i].amount > 0)
                    vm.payback.amount = Math.abs(vm.debts[i].amount);
                else
                    vm.payback.amount = null;
            });

            vm.setReceive = function(receive) {
                if(receive == vm.payback.receive) return;

                vm.payback = {
                    receive: receive,
                    user: null,
                    amount: null
                };
            };

            vm.getTab = function() {
                return vm.payback.receive ? 'receive' : 'give';
            };

            vm.actualDebt = function() {
                var i = indexOfUser(vm.payback.user);
                if(!~i) return 0;

                return Math.abs(vm.debts[i].amount);
            };

            vm.debtAfterAction = function() {
                return vm.actualDebt() - vm.payback.amount;
            };

            vm.showForm = function() {
                return vm.payback.receive ? vm.users.receive.length > 0 :  vm.users.give.length > 0;
            };

            vm.submit = function($event) {
                $event.preventDefault();

                vm.expense = new Expense({
                    title: 'Remboursement',
                    amount: vm.payback.amount,
                    payer: vm.payback.receive ? vm.payback.user : user,
                    recipients: [!vm.payback.receive ? vm.payback.user : user]
                });

                vm.expense.$save(function(){
                    snackbar.add("C'est fait !");
                    $state.go('home');
                });
            };
        }])
})();