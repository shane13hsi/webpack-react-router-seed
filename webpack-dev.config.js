'use strict';

var NotifyPlugin = require('./webpack/notifyplugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: true,
    debug: true,
    devtool: 'eval',
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8888',
            // Why only-dev-server instead of dev-server:
            // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
            'webpack/hot/only-dev-server',
            './src/client/main.js'
        ]
    },

    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js',
        publicPath: 'http://localhost:8888/build/'
    },

    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader'],
                test: /\.js$/
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        NotifyPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    resolve: {
        extensions: ['', '.js', '.json']
    }
};

