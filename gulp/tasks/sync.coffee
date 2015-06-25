gulp = require('gulp')
bg = require('gulp-bg')
bs = require('browser-sync').create()
path = require('path')
constants = require('../constants.coffee')
build = require('../webpack/build.coffee')
WebpackSyncConfig = require('../webpack/webpack.sync.config.coffee');

gulp.task('build-webpack-sync', build(WebpackSyncConfig))

gulp.task 'browserSync', ['build-webpack-sync'], ->
  bs.init
    logPrefix: 'WRRS'
    notify: false
    https: false
    proxy: 'http://localhost:8000'
    port: 3000
    browser: ['google-chrome']

  gulp.watch([path.join(constants.SRC_DIR, 'client/**/*.*')], ['build-webpack-sync'])

  gulp.watch([path.join(constants.BUILD_DIR, '**/*.*')], (file) ->
    bs.reload(path.relative(__dirname, file.path))
  )


gulp.task('sync', [
    'browserSync'
  ],
  bg('node', 'mock-server/sync'))
