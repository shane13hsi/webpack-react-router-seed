gutil = require('gulp-util')
webpack = require('webpack')
WebpackDevServer = require('webpack-dev-server')

module.exports = (webpackConfig) ->
  (callback) ->
    new WebpackDevServer(webpack(webpackConfig),
      contentBase: 'http://localhost:8888'
      hot: true
      publicPath: webpackConfig.output.publicPath
      quiet: false
      noInfo: true
      stats:
        assets: false
        colors: true
        version: false
        hash: false
        timings: false
        chunks: false
        chunkModules: false)
    .listen(8888, 'localhost', (err) ->
      # Callback is called only once, can't be used to catch compilation errors.
      if err
        throw new (gutil.PluginError)('webpack-dev-server', err)

      gutil.log '[webpack-dev-server]', 'localhost:8888/build/client.js'

      callback())
