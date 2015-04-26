const config = require('./config');

// piping Keep your code piping hot! Live code reloading without additional binaries
// 如果是 生产环境，或者有 piping 配置
if (config.isProduction || require('piping')(config.piping)) {

    require('babel/register');

    // To ignore webpack custom loaders on server.
    config.webpackStylesExtensions.forEach(function (ext) {
        require.extensions['.' + ext] = function () {
        };
    });

    require('./main');
}
