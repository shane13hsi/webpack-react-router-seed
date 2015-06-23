gulp = require('gulp')
buildProduct = require('../webpack/buildProduct.coffee')
WebpackProductConfig = require('../webpack/webpack.production.config.coffee');

gulp.task('product', buildProduct(WebpackProductConfig))
