(function(){
    'use strict';

    var modules = ['templates', 'ui.router', 'ngResource', 'ngSanitize'];
    angular
        .module('owus', modules)
        .run();
})();