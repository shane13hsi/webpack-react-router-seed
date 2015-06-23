config = require('./webpack.common.config.coffee')
constants = require('../constants.coffee')
_ = require('underscore')
path = require('path')
webpack = require('webpack')

module.exports = _.extend(config, {
  devtool: 'eval'

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

  module:
    loaders: [
      loaders: ['babel-loader']
      test: /\.js$/
      exclude: /node_modules/
    ]

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendor.js')
  ]
})
