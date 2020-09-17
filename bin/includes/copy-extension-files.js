const copyExtensionFile = require('./copy-extension-file.js');
const klaw = require('klaw');

/**
 * Customizes and copies extension assets to the distribution directories
 * @param {string} src - Absolute source path for extension file to be copied
 * @param {string} browser - Target browser for customization
 */
module.exports = (src, browser) => {
  klaw(src)
    .on('error', (error) => {
      console.log('~ on:error ~', error);
    })
    .on('data', (item) => {
      if(item.stats.isFile()) {
        copyExtensionFile(item.path, browser);
      };
    })
    .on('end', () => {
      // createBundleZip();
    });
};