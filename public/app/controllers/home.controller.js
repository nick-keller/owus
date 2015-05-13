(function(){
    'use strict';

    angular.module('owus')
        .controller('homeController', ['$http', function($http){
            var vm = this;

            vm.debts = [];

            $http.get('/me/debts').success(function(data) {
                data.forEach(function(debt) {
                    vm.debts.push(debt);
                });
            });

            vm.positiveDebt = function(a, b) {
                return a > b;
            };

            vm.negativeDebt = function(a, b) {
                return a < b;
            };
        }])
})();