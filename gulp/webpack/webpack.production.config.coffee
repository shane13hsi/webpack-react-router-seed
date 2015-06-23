config = require('./webpack.common.config.coffee')
constants = require('../constants.coffee')
_ = require('underscore')
path = require('path')
webpack = require('webpack')

module.exports = _.extend(config, {

  cache: false
  debug: false
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
    path: path.join(constants.DIST_DIR, 'js')
    filename: '[name].js'

  module:
    loaders: [
      loaders: ['babel-loader']
      test: /\.js$/
      exclude: /node_modules/
    ]

  plugins: [
    new webpack.DefinePlugin(
      'process.env':
        'NODE_ENV': JSON.stringify('production'))
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendor.js')
    new webpack.optimize.DedupePlugin()
    new webpack.optimize.OccurenceOrderPlugin()
    new webpack.optimize.UglifyJsPlugin(
      compress:
        warnings: false)
  ]
})

