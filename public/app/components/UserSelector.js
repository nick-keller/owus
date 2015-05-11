(function(){
    'use strict';

    angular.module('owus')
        .controller('userSelectorController', [function(){
            var vm = this;
        }])
        .directive('userSelector', [function() {
            return {
                restrict: 'E',
                templateUrl: 'components/UserSelector.html',
                scope: {},
                controller: 'userSelectorController',
                controllerAs: 'selectorCtrl',
                bindScopeToController: true
            };
        }]);
})();