bg = require('gulp-bg')
browserSync = require('browser-sync')
eslint = require('gulp-eslint')
gulp = require('gulp')
WebpackConfig = require('./webpack.dev.config.coffee')
WebpackProductionConfig = require('./webpack-production.config')
WebpackSyncConfig = require('./webpack-sync.config')
webpackBuild = require('./webpack/build')
webpackBuildSync = require('./webpack/buildSync')
webpackDevServer = require('./webpack/devserver')
yargs = require('yargs')
path = require('path')
args = yargs.alias('p', 'production').argv
gulp.task 'env', ->
  process.env.NODE_ENV = if args.production then 'production' else 'development'
  return
gulp.task 'build-webpack-production', webpackBuild(WebpackProductionConfig)
gulp.task 'build-webpack-sync', webpackBuildSync(WebpackSyncConfig)
gulp.task 'build-webpack-dev', webpackDevServer(WebpackConfig)
gulp.task 'build-webpack', [if args.production then 'build-webpack-production' else 'build-webpack-dev']
gulp.task 'build', ['build-webpack']
gulp.task 'eslint', ->
  gulp.src([
    'gulpfile.js'
    'src/**/*.js'
    'webpack/*.js'
  ]).pipe(eslint()).pipe(eslint.format()).pipe eslint.failOnError()
gulp.task 'server', [
  'env'
  'build'
], bg('node', 'src/server')
gulp.task 'default', ['server']
gulp.task 'browserSync', ['build-webpack-sync'], ->
  browserSync.init
    logPrefix: 'WRRS'
    notify: false
    https: false
    proxy: 'http://localhost:8000'
    port: 3000
    browser: ['google-chrome']
  gulp.watch ['src/client/**/*.*'], ['build-webpack-sync']
  gulp.watch ['build/**/*.*'], (file) ->
    browserSync.reload path.relative(__dirname, file.path)
    return
  return
gulp.task 'sync', [
  'env'
  'browserSync'
], bg('node', 'src/server/sync')
