(function(){
    'use strict';

    angular.module('owus')
        .controller('navBarController', ['user', '$rootScope', '$state', function(user, $rootScope, $state){
            var vm = this;
            var fromState;

            vm.user = user;
            vm.title = 'Owus';
            vm.showAddBtn = true;
            vm.menuDeployed = false;

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, _fromState, fromParams){
                vm.title = toState.data.title;
                vm.showAddBtn = toState.name == 'home';
                fromState = _fromState;
            });

            vm.goBack = function() {
                if(fromState.name == '')
                    return $state.go('home');
                $state.go(fromState);
            };

            vm.toggleSidebar = function() {
                vm.menuDeployed = !vm.menuDeployed;
            }
        }])
        .directive('navBar', [function() {
            return {
                restrict: 'E',
                templateUrl: 'components/NavBar.html',
                scope: {},
                controller: 'navBarController',
                controllerAs: 'navBarCtrl',
                bindToController: true
            };
        }]);
})();