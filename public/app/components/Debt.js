(function(){
    'use strict';

    angular.module('owus')
        .controller('debtController', ['user', function(user){
            var vm = this;

            vm.abs = Math.abs;
            vm.deployed = false;
            vm.subMenu = false;

            vm.userIsPayer = function(expense) {
                return expense.payer.facebookId === user.facebookId;
            };
        }])
        .directive('debt', [function() {
            return {
                restrict: 'E',
                templateUrl: 'components/Debt.html',
                controller: 'debtController',
                controllerAs: 'ctrl',
                scope: {
                    debt: '=',
                    last: '='
                }
            };
        }]);
})();