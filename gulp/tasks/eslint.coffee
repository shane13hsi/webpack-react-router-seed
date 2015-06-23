gulp = require('gulp')
eslint = require('gulp-eslint')
path = require('path')
constants = require('../constants.coffee')

gulp.task 'eslint', ->
  gulp.src([
    path.join(constants.SRC_DIR, '**/*.js')
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError())
