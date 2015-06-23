path = require('path')
ABSOLUTE_BASE = path.normalize(path.join(__dirname, '..'))

module.exports = Object.freeze(
  ABSOLUTE_BASE: ABSOLUTE_BASE
  NODE_MODULES_DIR: path.join(ABSOLUTE_BASE, 'node_modules')
  BUILD_DIR: path.join(ABSOLUTE_BASE, 'build')
  DIST_DIR: path.join(ABSOLUTE_BASE, 'dist')
  SRC_DIR: path.join(ABSOLUTE_BASE, 'src'))
