const config = require('../config');

// piping Keep your code piping hot! Live code reloading without additional binaries
if (require('piping')(config.piping)) {

    require('babel/register');

    // To ignore webpack custom loaders on server.
    config.webpackStylesExtensions.forEach(function(ext) {
        require.extensions['.' + ext] = function() {
        };
    });

    require('./main');
}
