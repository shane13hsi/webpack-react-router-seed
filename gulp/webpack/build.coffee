webpack = require('webpack')
gutil = require('gulp-util')

module.exports = (webpackConfig) ->
  (callback) ->
    webpack webpackConfig, (fatalError, stats) ->
      gutil.log '[webpack]', stats.toString(
        colors: true
        version: false
        hash: false
        timings: false
        chunks: false
        chunkModules: false)

      callback()
