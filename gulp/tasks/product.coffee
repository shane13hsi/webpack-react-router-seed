gulp = require('gulp')
build = require('../webpack/buildProduct.coffee')
WebpackProductConfig = require('../webpack/webpack.production.config.coffee');

gulp.task('product', build(WebpackProductConfig))
