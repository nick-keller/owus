(function(){
    'use strict';

    angular.module('owus')
        .service('friends', ['user', '$http', function(user, $http){
            var vm = this;
            vm.friends = null;

            vm.getAll = function() {
                if(vm.friends === null) {
                    vm.friends = [user];

                    $http.get('/me/friends').success(function(data) {
                        data.forEach(function(friend) {
                            vm.friends.push(friend);
                        });
                    });
                }

                return vm.friends;
            };
        }])
})();