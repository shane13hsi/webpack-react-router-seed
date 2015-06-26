constants = require('../constants.coffee')
path = require('path')
webpack = require('webpack')
NotifyPlugin = require('./notifyplugin')

module.exports =
  cache: true
  debug: true
  devtool: 'eval'

  entry:
    app: [
      'webpack-dev-server/client?http://localhost:8888'
      'webpack/hot/only-dev-server'
      path.join(constants.SRC_DIR, 'client/main.js')
    ]

  output:
    path: constants.BUILD_DIR,
    filename: '[name].js'
    publicPath: 'http://localhost:8888/build'

  resolve:
    extensions: [
      ''
      '.js'
      '.json'
    ]
    root: constants.SRC_DIR

  module:
    loaders: [
      loaders: ['react-hot', 'babel-loader']
      test: /\.js$/
      exclude: /node_modules/
    ]
    noParse: /\.min\.js/

  plugins: [
    NotifyPlugin
    new webpack.HotModuleReplacementPlugin()
    new webpack.NoErrorsPlugin()
  ]

