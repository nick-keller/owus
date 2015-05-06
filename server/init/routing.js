var express = require('express');
var path = require('path');
var routesDir = path.join(__dirname, '../routing');

/**
 * Init modules and errors routing
 */
var init = function(app) {

    var register = function(prefix, file){
        app.use(prefix, require(path.join(routesDir, file)));
    };

    // add routes
    //register('/', 'main');

    // if no match found try to serve static file
    app.use(express.static(path.join(__dirname, '../../public')));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not found');
        err.status = 404;
        next(err);
    });

    // development error handler
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            err.status = err.status || 500;
            console.log(err);
            res.status(err.status);
            res.json(err);
        });
    }

    // production error handler
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            error: err.status,
            status: err.status
        });
        next(err);
    });
};

module.exports = init;