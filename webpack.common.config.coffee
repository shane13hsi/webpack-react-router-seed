webpack = require('webpack')
NotifyPlugin = require('./webpack/notifyplugin')

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
    new (webpack.DefinePlugin)(
      'process.env':
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    )
    NotifyPlugin
  ]

