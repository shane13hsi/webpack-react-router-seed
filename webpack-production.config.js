'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NotifyPlugin = require('./webpack/notifyplugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: false,   // watch mode 默认为 true
    debug: false,
    devtool: '',
    entry: {
        app: ['./src/client/main.js'],
        vendors: [
            'moment',
            'react/addons',
            'react-router',
            'react-document-title',
            'underscore'
        ]
    },

    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: '[name].js'
    },

    module: {
        loaders: [{
            exclude: /node_modules/,
            loaders: [
                'babel-loader'
            ],
            test: /\.js$/
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendor.js'),
        new ExtractTextPlugin('./dist/css', {
            allChunks: true
        }),
        // Search for equal or similar files and deduplicate them in the output.
        new webpack.optimize.DedupePlugin(),
        // Assign the module and chunk ids by occurrence count.
        // Ids that are used often get lower (shorter) ids.
        // This make ids predictable, reduces to total file size and is recommended.
        new webpack.optimize.OccurenceOrderPlugin(),
        // Minimize all JavaScript output of chunks.
        // Loaders are switched into minimizing mode.
        // You can pass an object containing UglifyJs options.
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // Because uglify reports so many irrelevant warnings.
                warnings: false
            }
        })
    ],

    resolve: {
        extensions: ['', '.js', '.json']
    }
};
