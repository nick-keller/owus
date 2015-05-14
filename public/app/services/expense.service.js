(function(){
    'use strict';

    angular.module('owus')
        .factory('Expense', ['$resource', function($resource){
            return $resource('/expenses/:id', {id: '@_id'}, {
                query: {
                    url: 'me/expenses',
                    isArray: true
                },
                edit: {
                    method: 'PUT'
                }
            });
        }])
})();