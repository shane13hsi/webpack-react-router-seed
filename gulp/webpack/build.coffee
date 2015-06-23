webpack = require('webpack')
gutil = require('gulp-util')

module.exports = (webpackConfig) ->
  (callback) ->
    webpack webpackConfig, (fatalError, stats) ->
#
#      jsonStats = stats.toJson()
#      buildError = fatalError or jsonStats.errors[0] or jsonStats.warnings[0]
#      if buildError
#        throw new (gutil.PluginError)('webpack', buildError)

      gutil.log '[webpack]', stats.toString(
        colors: true
        version: false
        hash: false
        timings: false
        chunks: false
        chunkModules: false)

      callback()
