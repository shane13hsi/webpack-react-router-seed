/* @flow weak */

'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NotifyPlugin = require('./webpack/notifyplugin');
var path = require('path');
var webpack = require('webpack');

/**
 * return 数组，item 是 {loader: 串联的webpack loaders, test: 正则表达式}
 * */
function stylesLoaders() {
    var loaders = {
        'css': '',
        'less': '!less-loader',
        'scss|sass': '!sass-loader'
    };
    // Object.keys，拿到 loaders 的 key 组成的数组
    return Object.keys(loaders).map(function(ext) {
        var prefix = 'css-loader!autoprefixer-loader?browsers=last 2 version';
        // 串联
        var extLoaders = prefix + loaders[ext];
        // 如果是开发环境，串联 style-loader，表示将样式放到 document
        //  否则就使用 ExtractTextPlugin，抽成单独的 css 文件
        var loader = ExtractTextPlugin.extract('style-loader', extLoaders);
        return {
            loader: loader,
            // \\.(sass|scss)&
            test: new RegExp('\\.(' + ext + ')$')
        };
    });
}

module.exports = {
    cache: true,   // watch mode 默认为 true
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
        // 这个 plugin 的作用是定义些全局变量，开发时用
        new webpack.DefinePlugin({
            // JSON.stringify() 方法可以将任意的 JavaScript 值序列化成 JSON 字符串。
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        NotifyPlugin,
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendor.js'),
        // Render styles into separate cacheable file to prevent FOUC and
        // optimize for critical rendering path.
        new ExtractTextPlugin('./build/css', {
            allChunks: true
        })
    ],

    resolve: {
        extensions: ['', '.js', '.json']
    }
};
