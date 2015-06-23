gulp = require('gulp')
bg = require('gulp-bg')
webpackDevServer = require('../webpack/devserver.coffee')
WebpackConfig = require('../webpack/webpack.dev.config.coffee');

gulp.task('build-webpack-dev', webpackDevServer(WebpackConfig))

gulp.task('dev', [
    'env'
    'build-webpack-dev'
  ],
  bg('node', 'src/server'))
