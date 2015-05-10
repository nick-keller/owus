(function(){
    'use strict';

    angular.module('owus')
        .controller('navBarController', ['user', function(user){
            var vm = this;

            vm.user = user;
        }])
        .directive('navBar', [function() {
            return {
                restrict: 'E',
                templateUrl: 'components/NavBar.html',
                scope: {},
                controller: 'navBarController',
                controllerAs: 'navBar',
                bindScopeToController: true
            };
        }]);
})();