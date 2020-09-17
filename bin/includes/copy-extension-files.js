const klaw = require('klaw');
const copyExtensionFile = require('./copy-extension-file.js');
const createBundleZip = require('./create-bundle-zip.js');

/**
 * Customizes and copies extension assets to the distribution directories
 * @param {string} src - Absolute source path for extension file to be copied
 * @param {string} browser - Target browser for customization
 * @param {boolean} bundle - Bundle files into a zip file
 */
module.exports = (src, browser, bundle = false) => {
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
      if(bundle) {
        createBundleZip(browser);
      }
    });
};