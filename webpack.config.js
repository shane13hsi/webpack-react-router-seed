/* @flow weak */

var NotifyPlugin = require('./webpack/notifyplugin');
var path = require('path');
var webpack = require('webpack');

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
        var loader = 'style-loader!' + extLoaders;
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
    devtool: 'eval',    // Each module is executed with eval and a SourceMap is added as DataUrl to the eval
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
                loader: 'url-loader?limit=100000',
                test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/
            }, {
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader'],
                test: /\.js$/
            }
        ].concat(stylesLoaders())
    },

    plugins: [
        // 这个 plugin 的作用是定义些全局变量，开发时用
        new webpack.DefinePlugin({
            // JSON.stringify() 方法可以将任意的 JavaScript 值序列化成 JSON 字符串。
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        NotifyPlugin,
        new webpack.HotModuleReplacementPlugin(),
        // Tell reloader to not reload if there is an error.
        new webpack.NoErrorsPlugin()
    ],

    resolve: {
        extensions: ['', '.js', '.json']
    }
};
