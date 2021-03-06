(function(){
    'use strict';

    angular.module('owus')
        .controller('navBarController', ['user', '$rootScope', '$state', 'snackbar', function(user, $rootScope, $state, snackbar){
            var vm = this;
            var fromState;

            vm.user = user;
            vm.title = 'Owus';
            vm.showAddBtn = true;
            vm.menuDeployed = false;
            vm.snackbar = snackbar;
            vm.showSnackbar = false;
            snackbar.listen(function(show, current){
                vm.showSnackbar = show;
                vm.snackbarContent = current;
            });

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, _fromState, fromParams){
                vm.title = toState.data.title;
                vm.showAddBtn = toState.data.addBtn !== false ? true : false;
                fromState = _fromState;
            });

            vm.add = function() {
                $state.go($state.$current.data.addBtn);
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
                bindToController: true,
                link: function(scope, element, attrs){
                    element.find('.list-item').bind('click', scope.navBarCtrl.toggleSidebar);
                }
            };
        }]);
})();