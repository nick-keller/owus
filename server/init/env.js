var path = require('path');

/**
 * Init the app. Sets db connexion and routes.
 * @param app
 */
var init = function(app) {
    var parameters = require('../config/parameters.js');

    require('./db')(parameters.mongodb);
    require('./routing')(app);
};

module.exports = init;
