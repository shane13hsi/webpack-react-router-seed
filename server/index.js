const config = require('./config');

// piping Keep your code piping hot! Live code reloading without additional binaries
if (require('piping')(config.piping)) {

  require('babel/register');

  require('./main');
}
