var session = require('express-session');
var path = require('path');

/**
 * Init the app. Sets db connexion and routes.
 * @param app
 */
var init = function(app) {
    var parameters = require('../config/parameters.js');


    app.use(session({ secret: parameters.secret, key: 'sid' }));

    require('./db')(parameters.mongodb);
    require('./facebook')(parameters.facebook);
    require('./routing')(app);
};

module.exports = init;
