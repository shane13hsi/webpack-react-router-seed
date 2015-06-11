/* eslint-env node */

'use strict';

var bg = require('gulp-bg');
var browserSync = require('browser-sync');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var WebpackConfig = require('./webpack-dev.config');
var WebpackProductionConfig = require('./webpack-production.config');
var WebpackSyncConfig = require('./webpack-sync.config');
var webpackBuild = require('./webpack/build');
var webpackDevServer = require('./webpack/devserver');
var yargs = require('yargs');
var path = require('path');

var args = yargs
    .alias('p', 'production')
    .argv;

gulp.task('env', function() {
    process.env.NODE_ENV = args.production ? 'production' : 'development';
});

gulp.task('build-webpack-production', webpackBuild(WebpackProductionConfig));
gulp.task('build-webpack-sync', webpackBuild(WebpackSyncConfig));
gulp.task('build-webpack-dev', webpackDevServer(WebpackConfig));
gulp.task('build-webpack', [args.production ? 'build-webpack-production' : 'build-webpack-dev']);
gulp.task('build', ['build-webpack']);

gulp.task('eslint', function() {
    return gulp.src([
        'gulpfile.js',
        'src/**/*.js',
        'webpack/*.js'
    ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('server', ['env', 'build'], bg('node', 'src/server'));

gulp.task('default', ['server']);

gulp.task('browserSync', ['build-webpack-sync'], function() {
    browserSync.init({
        logPrefix: 'WRRS',

        notify: false,
        // Run as an https by setting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        https: false,

        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: 'http://localhost:8000',

        // informs browser-sync to use the following port for the proxied app
        // notice that the default port is 3000, change if clash with our expressjs
        port: 3000,

        // open the proxied app in chrome
        browser: ['google-chrome']
    });

    gulp.watch(['build/**/*.*'], function(file) {
        browserSync.reload(path.relative(__dirname, file.path));
    });
});

gulp.task('watch', function(){
    gulp.watch(['src/client/**/*.*'], ['build-webpack-sync']);
});

gulp.task('sync', ['env', 'browserSync', 'watch'], bg('node', 'src/server/sync'));
