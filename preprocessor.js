var coffee = require('coffee-react');
var babel = require('babel-core');

function to6(src) {
  return babel.transform(src, {
    filename: src,
    stage: 2,
    retainLines: true,
    auxiliaryCommentBefore: 'istanbul ignore next'
  }).code;
}

module.exports = {
  process: function(src, path) {
    var compiled_to_js, compiled_to_react;

    // CoffeeScript files can be .coffee, .litcoffee, or .coffee.md
    if (coffee.helpers.isCoffee(path)) {
      compiled_to_js = coffee.compile(src, {'bare': true});
      compiled_to_react = to6(compiled_to_js);
      return compiled_to_react;
    }

    if (path.indexOf('node_modules') === -1 && babel.canCompile(path)) {
      return to6(src);
    }

    return src;
  }
};
