// const path = require('path');
const manifestJSON = require('../extension/manifest.json');
const customizeManifestJSON = require('./customize-manifest-json');

// @todo filter based on node env (add map files for development)
const customizeExtensionFile = (filename, targetBrowser) => {
  // console.log('___', filename, targetBrowser.name);
  if(filename === 'manifest.json') {
    return customizeManifestJSON(manifestJSON, targetBrowser);
  } else if(filename.endsWith('.map')) {
    return false;
  } else if(filename.startsWith('.')) {
    return false;
  }
  return true;
};

module.exports = customizeExtensionFile;