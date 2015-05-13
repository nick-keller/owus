(function(){
    'use strict';

    angular.module('owus')
        .factory('Expense', ['$resource', function($resource){
            return $resource('/expenses/:id', {id: '@_id'}, {
                add: {
                    method: 'POST',
                    url: '/expenses'
                }
            });
        }])
})();