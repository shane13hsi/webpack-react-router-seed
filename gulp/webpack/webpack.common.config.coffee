webpack = require('webpack')
NotifyPlugin = require('./notifyplugin')

module.exports =
  module:
    noParse: /\.min\.js/

  resolve:
    extensions: [
      ''
      '.js'
      '.json'
    ]

  plugins: [
    NotifyPlugin
  ]

