(function(){
    'use strict';

    angular.module('owus')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

            $urlRouterProvider.otherwise("/");
            //$locationProvider.html5Mode(true);

            $stateProvider
                .state('home', {
                    url: "/",
                    templateUrl: "views/home.html",
                    data: {
                        title: 'Owus'
                    }
                })
                .state('add', {
                    url: "/add",
                    templateUrl: "views/add.html",
                    controller: 'addController',
                    controllerAs: 'addCtrl',
                    data: {
                        title: 'Ajouter'
                    }
                });
        }]);
})();