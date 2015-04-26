/* @flow weak */

'use strict';

var webpack = require('webpack');
var gutil = require('gulp-util');

/**
 * - webpackConfig 参数是 webpack config
 * */
module.exports = function (webpackConfig) {
    return function (callback) {
        /**
         * webpack(config, func)
         * func(error, stats)
         * */
        webpack(webpackConfig, function (fatalError, stats) {
            var jsonStats = stats.toJson();
            var buildError = fatalError || jsonStats.errors[0] || jsonStats.warnings[0];

            if (buildError)
                throw new gutil.PluginError('webpack', buildError);

            gutil.log('[webpack]', stats.toString({
                colors: true,
                version: false,
                hash: false,
                timings: false,
                chunks: false,
                chunkModules: false
            }));

            callback();
        });
    };
};
