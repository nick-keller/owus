(function(){
    'use strict';

    angular.module('owus')
        .controller('transferController', ['$http', function($http){
            var vm = this;

            vm.debts = null;
            vm.groups = [];

            $http.get('/me/transfer').success(function(data) {

                vm.debts = data.debts;

                data.groups.forEach(function(group) {
                    vm.groups.push(group);
                });
            });
        }])
})();