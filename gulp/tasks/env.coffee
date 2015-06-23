gulp = require('gulp')
yargs = require('yargs')

args = yargs.alias('p', 'production').argv
gulp.task 'env', ->
  process.env.NODE_ENV = if args.production then 'production' else 'development'
