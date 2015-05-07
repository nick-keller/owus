var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swig = require('swig');

var app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/../public');
app.set('view cache', false);
swig.setDefaults({ cache: false });

require('./init/env')(app);

module.exports = app;
