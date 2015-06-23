config = require('./webpack.common.config.coffee')
constants = require('../constants.coffee')
_ = require('underscore')
path = require('path')
webpack = require('webpack')

module.exports = _.extend(config, {
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

  module:
    loaders: [
      loaders: ['react-hot', 'babel-loader']
      test: /\.js$/
      exclude: /node_modules/
    ]

  plugins: [
    new webpack.HotModuleReplacementPlugin()
    new webpack.NoErrorsPlugin()
  ]
})

