(function(){
    'use strict';

    angular.module('owus')
        .controller('expenseController', ['user', '$scope', function(user, $scope){
            var vm = this;

            vm.abs = Math.abs;
            vm.deployed = false;
            vm.subMenu = false;

            vm.userIsPayer = function() {
                return vm.isUser($scope.expense.payer);
            };

            vm.isUser = function(u) {
                return u.facebookId === user.facebookId;
            };

            vm.numberOfRecipientsOtherThanMe = function() {
                var length = $scope.expense.recipients.length;

                for(var i=0; i<length; ++i) {
                    if($scope.expense.recipients[i].facebookId == user.facebookId) {
                        length--;
                        break;
                    }
                }

                return length;
            };

            vm.getOtherFacebookId = function() {
                for(var i=0; i<$scope.expense.recipients.length; ++i) {
                    if($scope.expense.recipients[i].facebookId != user.facebookId) {
                        return $scope.expense.recipients[i].facebookId;
                    }
                }
            };
        }])
        .directive('expense', [function() {
            return {
                restrict: 'E',
                templateUrl: 'components/Expense.html',
                controller: 'expenseController',
                controllerAs: 'ctrl',
                scope: {
                    expense: '=',
                    last: '='
                }
            };
        }]);
})();