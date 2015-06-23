constants = require('../constants.coffee')
path = require('path')
webpack = require('webpack')
NotifyPlugin = require('./notifyplugin')

module.exports =
  cache: true
  debug: true
  devtool: ''

  entry:
    app: [
      path.join(constants.SRC_DIR, 'client/main.js')
    ]
    vendors: [
      'moment'
      'react'
      'react-router'
      'react-document-title'
      'underscore'
    ]

  output:
    path: path.join(constants.BUILD_DIR, 'js'),
    filename: '[name].js'

  resolve:
    extensions: [
      ''
      '.js'
      '.json'
    ]

  module:
    loaders: [
      loaders: ['babel-loader']
      test: /\.js$/
      exclude: /node_modules/
    ]
    noParse: /\.min\.js/

  plugins: [
    NotifyPlugin
    new webpack.DefinePlugin(
      'process.env':
        'NODE_ENV': JSON.stringify('development'))
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendor.js')
  ]

