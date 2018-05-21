var glob = require('glob'),
    path = require('path'),
    env = process.env.NODE_ENV || 'development',
//    env = process.env.NODE_ENV || 'local',
    mongoose = require('mongoose'),
    async = require('async'),
    _ = require('lodash'),
    winston = require('winston'),
    fs = require('fs'),
    autoIncrement = require('mongoose-auto-increment');

global.config = {};

module.exports = function (callback) {

    async.series([
        function (envCb) {
            // configuring the environment
            glob("config/env/**/*.json", function (err, files) {

                if (err) {
                    return envCb(err);
                }
                else {
                    // picking up the environment file
                    config = require(path.join(__dirname, 'env', env + '.json'));
                    _.extend(config, JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8')));

                    if (!config) {
                        return envCb('error occured while loading config file!');
                    }
                    else {
                        winston.info('loaded config file:', env);

                        var dbURI = config.mongodb.host + config.mongodb.db_name;
                        //make connection with mongodb
                        if (!mongoose.connection.readyState) {
                            let connection = mongoose.connect(dbURI);
                            autoIncrement.initialize(connection);
                        }
                        else
                            return envCb();

                        // when successfully connected
                        mongoose.connection.on('connected', function () {
                            winston.info('mongoose connection open to ' + dbURI);
                            return envCb();
                        });

                        // if the connection throws an error
                        mongoose.connection.on('error', function (err) {
                            return envCb(err);
                        });

                        // when the connection is disconnected
                        mongoose.connection.on('disconnected', function () {
                            return envCb('mongoose connection disconnected');
                        });
                    }
                }
            });

        },
        function (modelsCb) {
            // load all models
            glob("modules/**/*.model.js", function (err, files) {

                if (err) {
                    return modelsCb(err);
                }
                else {
                    winston.info('models are loading ...');
                    files.forEach(function (file) {
                        require(path.join(__dirname, '../', file));
                        winston.info(file, 'is loaded');
                    });
                    require('./scheduler');
                    require('./agenda');
                    return modelsCb();
                }
            });


        }], function (err) {
        if (err) {
            return callback(err);
        }
        else {
            return callback();
        }
    });

};
