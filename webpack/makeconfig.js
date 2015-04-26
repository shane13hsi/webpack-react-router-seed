/* @flow weak */

'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NotifyPlugin = require('./notifyplugin');
var path = require('path');
var webpack = require('webpack');

// 定义需要的 loader
var loaders = {
    'css': '',
    'less': '!less-loader',
    'scss|sass': '!sass-loader',
    'styl': '!stylus-loader'
};

/**
 * - isDevelopment 是否是 dev
 * */
module.exports = function (isDevelopment) {

    /**
     * return 数组，item 是 {loader: 串联的webpack loaders, test: 正则表达式}
     * */
    function stylesLoaders() {
        // Object.keys，拿到 loaders 的 key 组成的数组
        return Object.keys(loaders).map(function (ext) {
            // An autoprefixer loader for webpack.
            var prefix = 'css-loader!autoprefixer-loader?browsers=last 2 version';
            // 串联
            var extLoaders = prefix + loaders[ext];
            // 如果是开发环境，串联 style-loader，表示将样式放到 document
            //  否则就使用 ExtractTextPlugin，抽成单独的 css 文件
            var loader = isDevelopment
                ? 'style-loader!' + extLoaders
                : ExtractTextPlugin.extract('style-loader', extLoaders);
            return {
                loader: loader,
                // \\.(sass|scss)&
                test: new RegExp('\\.(' + ext + ')$')
            };
        });
    }

    var config = {
        cache: isDevelopment,   // watch mode 默认为 true
        debug: isDevelopment,   // todo: debug mode 是什么？
        devtool: isDevelopment ? 'eval-source-map' : '',    // Each module is executed with eval and a SourceMap is added as DataUrl to the eval
        entry: {
            app: isDevelopment ? [
                'webpack-dev-server/client?http://localhost:8888',
                // Why only-dev-server instead of dev-server:
                // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
                'webpack/hot/only-dev-server',
                './src/client/main.js'
            ] : [
                './src/client/main.js'
            ],
            // todo: 稍后了解
            // For Safari, IE<11, and some old browsers. More languages will need more
            // specific builds.
            appintl: isDevelopment ? [
                'webpack-dev-server/client?http://localhost:8888',
                // Why only-dev-server instead of dev-server:
                // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
                'webpack/hot/only-dev-server',
                './node_modules/intl/Intl.js',
                './node_modules/intl/locale-data/jsonp/en.js',
                './src/client/main.js'
            ] : [
                './node_modules/intl/Intl.js',
                './node_modules/intl/locale-data/jsonp/en.js',
                './src/client/main.js'
            ]
        },
        // 图片，JS，和 Style
        module: {
            // 图片使用 data-url 内嵌
            loaders: [{
                loader: 'url-loader?limit=100000',
                test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/
            }, {
                exclude: /node_modules/,
                loaders: isDevelopment ? [
                    'react-hot', 'babel-loader'
                ] : [
                    'babel-loader'
                ],
                test: /\.js$/
            }].concat(stylesLoaders())
        },
        output: isDevelopment ? {
            path: path.join(__dirname, '/build/'),
            filename: '[name].js',
            publicPath: 'http://localhost:8888/build/'
        } : {
            path: 'build/',
            filename: '[name].js'
        },
        plugins: (function () {
            var plugins = [
                // 这个 plugin 的作用是定义些全局变量，开发时用
                new webpack.DefinePlugin({
                    'process.env': {
                        // JSON.stringify() 方法可以将任意的 JavaScript 值序列化成 JSON 字符串。
                        NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
                        IS_BROWSER: true
                    }
                })
            ];
            if (isDevelopment)
                plugins.push(
                    NotifyPlugin,
                    new webpack.HotModuleReplacementPlugin(),
                    // Tell reloader to not reload if there is an error.
                    new webpack.NoErrorsPlugin()
                );
            else
                plugins.push(
                    // FOUC 文档样式短暂失效， Flash of unstyled content 浏览器样式闪烁
                    // 解决方法就是 使用LINK标签将样式表放在文档HEAD中。
                    // Render styles into separate cacheable file to prevent FOUC and
                    // optimize for critical rendering path.
                    new ExtractTextPlugin('app.css', {
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
                );
            return plugins;
        })(),
        resolve: {
            extensions: ['', '.js', '.json']
        }
    };

    return config;

};
