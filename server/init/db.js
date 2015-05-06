var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

/**
 * Init db connection and load models
 * @param parameters
 */
var init = function(parameters) {

    function initConnection() {

        var connect = function () {
            var options = { server: { socketOptions: { keepAlive: 1 } } };
            mongoose.connect('mongodb://' + parameters.host + '/' + parameters.database, options);
        };

        mongoose.connection.on('error', function(err) {
            console.log(err);
            process.exit(1);
        });

        mongoose.connection.on('disconnected', connect);

        connect();
    }

    function initModels() {

        var modelDir = path.join(__dirname, '../model');

        fs.readdirSync(modelDir).forEach(function (file) {
            if (~file.indexOf('.model.js') && !~file.indexOf('.swp'))
                require(path.join(modelDir, file));
        });
    }

    initConnection();
    initModels();
};

module.exports = init;