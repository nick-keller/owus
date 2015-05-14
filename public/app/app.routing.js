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
                    controller: 'homeController',
                    controllerAs: 'homeCtrl',
                    data: {
                        title: 'Owus'
                    }
                })
                .state('add', {
                    url: "/expenses/add",
                    templateUrl: "views/add.html",
                    controller: 'addController',
                    controllerAs: 'addCtrl',
                    data: {
                        title: 'Ajouter',
                        addBtn: false
                    }
                })
                .state('edit', {
                    url: "/expenses/{id}/edit",
                    templateUrl: "views/add.html",
                    controller: 'editController',
                    controllerAs: 'addCtrl',
                    data: {
                        title: 'Editer',
                        addBtn: false
                    }
                })
                .state('expenses', {
                    url: "/expenses",
                    templateUrl: "views/expenses.html",
                    controller: 'expensesController',
                    controllerAs: 'expensesCtrl',
                    data: {
                        title: 'Historique'
                    }
                })
                .state('payback', {
                    url: "/pay-back/{facebookId:int}",
                    templateUrl: "views/payback.html",
                    controller: 'paybackController',
                    controllerAs: 'paybackCtrl',
                    data: {
                        title: 'Rembourser',
                        addBtn: false
                    },
                    params: {
                        facebookId: null
                    }
                });
        }]);
})();