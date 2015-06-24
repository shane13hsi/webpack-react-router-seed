var coffee = require('coffee-react');
var babel = require('babel-core');

module.exports = {
  process: function(src, path) {
    // CoffeeScript files can be .coffee, .litcoffee, or .coffee.md
    if (coffee.helpers.isCoffee(path)) {
      return coffee.compile(src, {'bare': true});
    }

    // Allow the stage to be configured by an environment
    // variable, but use Babel's default stage (2) if
    // no environment variable is specified.
    var stage = process.env.BABEL_JEST_STAGE || 2;
    // Ignore all files within node_modules
    // babel files can be .js, .es, .jsx or .es6
    if (path.indexOf("node_modules") === -1 && babel.canCompile(path)) {
      return babel.transform(src, {
        filename: path,
        stage: stage,
        retainLines: true,
        auxiliaryCommentBefore: "istanbul ignore next"
      }).code;
    }
    return src;
  }
};
