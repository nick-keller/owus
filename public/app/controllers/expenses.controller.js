(function(){
    'use strict';

    angular.module('owus')
        .controller('expensesController', ['user', 'Expense', function(user, Expense){
            var vm = this;

            vm.expenses = Expense.query();
            vm.filter = 'all';
        }])
        .filter('expensesFilter', ['user', function(user) {
            return function(expenses, filter){
                if(filter == 'all')
                    return expenses;

                var result = [];

                expenses.forEach(function(expense){
                    var isPayer = expense.payer.facebookId == user.facebookId;
                    if(filter == 'me' ? isPayer : !isPayer)
                        result.push(expense);
                });

                return result;
            };
        }])
})();