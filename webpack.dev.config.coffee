config = require('./webpack.common.config.coffee')
_ = require('underscore')
path = require('path')
webpack = require('webpack')

module.exports = _.extend(config, {
  devtool: 'eval'

  entry:
    app: [
      'webpack-dev-server/client?http://localhost:8888'
      'webpack/hot/only-dev-server'
      './src/client/main.js'
    ]

  output:
    path: path.join __dirname, './build'
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

