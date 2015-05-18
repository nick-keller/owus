(function(){
    'use strict';

    angular.module('owus')
        .factory('Group', ['$resource', function($resource){
            return $resource('/groups/:id', {id: '@_id'}, {
                edit: {
                    method: 'PUT'
                }
            });
        }])
})();