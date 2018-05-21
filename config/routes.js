const glob = require('glob');
const path = require('path');
const winston = require('winston');

module.exports = (app) => {

    winston.info('routes are loading ...');
    let routePath = 'modules/**/*.routes.js';
    let version = '/api/v1';
    glob.sync(routePath).forEach(function(file) {
        require('../'+file)(app, version);
        winston.info(file + ' is loaded');
    });
};