/* eslint-env node */

'use strict';

var bg = require('gulp-bg');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var WebpackConfig = require('./webpack.config');
var WebpackProductionConfig = require('./webpack-production.config');
var webpackBuild = require('./webpack/build');
var webpackDevServer = require('./webpack/devserver');
var yargs = require('yargs');

var args = yargs
    .alias('p', 'production')
    .argv;

gulp.task('env', function() {
    process.env.NODE_ENV = args.production ? 'production' : 'development';
});

gulp.task('build-webpack-production', webpackBuild(WebpackProductionConfig));
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
