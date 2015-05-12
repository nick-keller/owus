(function(){
    'use strict';

    angular.module('owus')
        .directive('userChip', [function() {
            return {
                restrict: 'E',
                templateUrl: 'components/UserChip.html',
                scope: {
                    user: '=',
                    selected: '='
                }
            };
        }]);
})();