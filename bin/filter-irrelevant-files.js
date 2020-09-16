const path = require('path');

/**
 * Skips unnecessary files for deployment
 * Note: Negated filtering was necessary to keep files inside matching directories filtered by "klaw" module
 * @param {string} src - Absolute path for a file 
 */
module.exports = (src) => {
  const basename = path.basename(src);
  return (
    !basename.endsWith('.js.map') &&
    !basename.startsWith('.')
  );
};
