var express     = require('express');
var load        = require('express-load');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var logger      = require('winston');
var appSettings = require('./settings');
var cors        = require('cors');

module.exports = function() {
    var app = express();

    logger.level = 'debug';

    app.set('port', appSettings.servicePort);

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    app.use(morgan('dev'));
    app.use(cors());

    load('controllers', {cwd:'api'})
    .then('routes')
    .into(app);

    return app;
};
