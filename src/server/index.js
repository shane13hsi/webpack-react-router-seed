const config = require('./config');

// piping Keep your code piping hot! Live code reloading without additional binaries
// 如果是 生产环境，或者有 piping 配置
if (config.isProduction || require('piping')(config.piping)) {
    if (!process.env.NODE_ENV)
        throw new Error('Environment variable NODE_ENV must be set.');

    // Load and use polyfill for ECMA-402.
    if (!global.Intl)
        global.Intl = require('intl');

    require('babel/register');

    // To ignore webpack custom loaders on server.
    config.webpackStylesExtensions.forEach(function (ext) {
        require.extensions['.' + ext] = function () {
        };
    });

    require('./main');
}
