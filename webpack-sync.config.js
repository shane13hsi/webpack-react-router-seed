'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NotifyPlugin = require('./webpack/notifyplugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: true,
    debug: true,
    devtool: 'eval',
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
        path: path.resolve(__dirname, './build/js'),
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
        NotifyPlugin,
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendor.js'),
        new ExtractTextPlugin('./build/css', {
            allChunks: true
        })
    ],

    resolve: {
        extensions: ['', '.js', '.json']
    }
};
