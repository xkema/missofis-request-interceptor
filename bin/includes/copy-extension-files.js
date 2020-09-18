const klaw = require('klaw');
const copyExtensionFile = require('./copy-extension-file.js');
const createBundleZip = require('./create-bundle-zip.js');
const linterEslint = require('./linter-eslint.js');
const linterAddons = require('./linter-addons.js');

/**
 * Customizes and copies extension assets to the distribution directories
 * @todo Move 'end' event out of this module with a callback or Promise.resolve()
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
    .on('end', async () => {
      if(bundle) {
        if(await linterEslint(`dist/${browser.name}/**/*.js`) && await linterAddons(`dist/${browser.name}`)) {
          console.log(`${browser.name}:linters:passed`);
          createBundleZip(browser);
        } else {
          console.log(`${browser.name}:eslint:failed`);
          console.log(`${browser.name}:addons:failed`);
          console.log(`Bundle creting has failed!`);
        }
      }
    });
};