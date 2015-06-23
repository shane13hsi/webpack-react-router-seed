'use strict';

var webpack = require('webpack');
var gutil = require('gulp-util');

module.exports = function(webpackConfig) {
    return function(callback) {
        webpack(webpackConfig, function(fatalError, stats) {

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
