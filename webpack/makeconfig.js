/* @flow weak */

'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NotifyPlugin      = require('./notifyplugin');
var path              = require('path');
var webpack           = require('webpack');

module.exports = function(isDevelopment) {
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
        debug: isDevelopment,
        devtool: isDevelopment ? 'eval' : '',    // Each module is executed with eval and a SourceMap is added as DataUrl to the eval

        entry: {
            app: isDevelopment ? [
                'webpack-dev-server/client?http://localhost:8888',
                // Why only-dev-server instead of dev-server:
                // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
                'webpack/hot/only-dev-server',
                './src/client/main.js'
            ] : [
                './src/client/main.js'
            ]
        },

        output: isDevelopment ? {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js',
            publicPath: 'http://localhost:8888/build/'
        } : {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
        },

        module: {
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

        plugins: (function() {
            var plugins = [
                // 这个 plugin 的作用是定义些全局变量，开发时用
                new webpack.DefinePlugin({
                    // JSON.stringify() 方法可以将任意的 JavaScript 值序列化成 JSON 字符串。
                    'process.env': {
                        'NODE_ENV': isDevelopment ? JSON.stringify('development') : JSON.stringify('production')
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
