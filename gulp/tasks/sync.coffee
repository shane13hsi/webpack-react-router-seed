gulp = require('gulp')
bg = require('gulp-bg')
browserSync = require('browser-sync')
build = require('../webpack/build.coffee')
WebpackSyncConfig = require('../webpack/webpack.sync.config.coffee');

gulp.task('build-webpack-sync', build(WebpackSyncConfig))

gulp.task 'browserSync', ['build-webpack-sync'], ->
  browserSync.init
    logPrefix: 'WRRS'
    notify: false
    https: false
    proxy: 'http://localhost:8000'
    port: 3000
    browser: ['google-chrome']

  gulp.watch(['src/client/**/*.*'], ['build-webpack-sync'])
  gulp.watch(['build/**/*.*'], (file) ->
    browserSync.reload(path.relative(__dirname, file.path)))

gulp.task('sync', [
    'env'
    'browserSync'
  ],
  bg('node', 'src/server/sync'))
