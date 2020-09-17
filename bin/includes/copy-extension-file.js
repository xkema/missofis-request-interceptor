const path = require('path');
const fs = require('fs-extra');
const customizeManifestJSON = require('./customize-manifest.js');
const customizeInterceptedTypes = require('./customize-intercepted-types.js');

/**
 * Customizes and copies extension assets to the distribution directories
 * @param {string} src - Absolute source path for extension file to be copied
 * @param {string} browser - Target browser for customization
 */
module.exports = (src, browser) => {
  const basename = path.basename(src);
  const dest = src.replace('/extension/', `/dist/${browser.name}/`);
  if(basename === 'manifest.json') {
    fs.outputJsonSync(dest, customizeManifestJSON(src, browser), { spaces: 2 });
  } else if(basename === 'intercepted-types.js') {
    fs.outputFileSync(dest, customizeInterceptedTypes(src, browser));
  } else if(!basename.endsWith('.js.map') && !basename.startsWith('.')) {
    fs.copySync(src, dest);
  }
};