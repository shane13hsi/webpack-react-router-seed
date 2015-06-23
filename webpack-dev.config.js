'use strict';

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
        var loader = 'style-loader!' + extLoaders;
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
