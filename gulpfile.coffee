bg = require('gulp-bg')
gulp = require('gulp')
WebpackConfig = require('./webpack.dev.config.coffee')
WebpackProductionConfig = require('./webpack-production.config')
WebpackSyncConfig = require('./webpack-sync.config')
webpackBuild = require('./webpack/build')
webpackBuildSync = require('./webpack/buildSync')
webpackDevServer = require('./webpack/devserver')
yargs = require('yargs')
path = require('path')

gulp.task 'build-webpack-production', webpackBuild(WebpackProductionConfig)
gulp.task 'build-webpack-sync', webpackBuildSync(WebpackSyncConfig)
gulp.task 'build-webpack-dev', webpackDevServer(WebpackConfig)
gulp.task 'build-webpack', [if args.production then 'build-webpack-production' else 'build-webpack-dev']
gulp.task 'build', ['build-webpack']
