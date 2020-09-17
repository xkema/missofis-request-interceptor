// const path = require('path');
// const fs = require('fs-extra');
const zipdir = require('zip-dir');
const getBundleName = require('./get-bundle-name.js');
const packageJson = require('../../package.json');

/**
 * Bundles assets into a zip file
 * @param {string} browser - Target browser for customization
 */
module.exports = (browser) => {
  zipdir(`dist/${browser.name}`, {
    saveTo: `dist/${getBundleName(packageJson.name, browser.name, packageJson.version)}.zip`
  }, (error, buffer) => {
    if(error) {
      console.log(error);
    }
  });
};