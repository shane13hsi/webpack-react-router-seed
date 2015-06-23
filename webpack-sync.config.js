'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NotifyPlugin = require('./webpack/notifyplugin');
var path = require('path');
var webpack = require('webpack');

function stylesLoaders() {
    var loaders = {
        'css': '',
        'less': '!less-loader',
        'scss|sass': '!sass-loader'
    };
    return Object.keys(loaders).map(function(ext) {
        var prefix = 'css-loader!autoprefixer-loader?browsers=last 2 version';
        var extLoaders = prefix + loaders[ext];
        var loader = ExtractTextPlugin.extract('style-loader', extLoaders);
        return {
            loader: loader,
            test: new RegExp('\\.(' + ext + ')$')
        };
    });
}

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
            loader: 'url-loader?limit=100000',
            test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/
        }, {
            exclude: /node_modules/,
            loaders: [
                'babel-loader'
            ],
            test: /\.js$/
        }].concat(stylesLoaders())
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
