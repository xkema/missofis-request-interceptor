const path = require('path');

/**
 * Filters files to be copied without any customization
 * @returns {boolean} Filter result for current file
 */
module.exports = (src, dest) => {
  const basename = path.basename(src);
  if(
    basename === 'manifest.json' ||
    basename === 'intercepted-types.js' ||
    basename.endsWith('.js.map') ||
    basename.startsWith('.')
  ) {
    return false;
  }
  return true;
};
