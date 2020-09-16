const fs = require('fs-extra');
const path = require('path');
const targetBrowsers = require('./target-browsers.js');
const customizeManifestJSON = require('./customize/customize-manifest-json');
const customizeInterceptedTypes = require('./customize/customize-intercepted-types.js');

/**
 * Modifies adn copies customized files to  the target directory
 */
module.exports = (browser) => {
  // customize "manifest.json"
  const targetBrowser = targetBrowsers.filter(targetBrowser => targetBrowser.name === browser)[0];
  const contentManifest = customizeManifestJSON('extension/manifest.json', targetBrowser);
  fs.outputJsonSync(`dist/${browser}/manifest.json`, contentManifest, { spaces: 2 });
  // customize "intercepted-types"
  const contentInterceptedTypes = customizeInterceptedTypes('extension/core/modules/intercepted-types.js', targetBrowser);
  fs.outputFileSync(`dist/${browser}/core/modules/intercepted-types.js`, contentInterceptedTypes);
};
