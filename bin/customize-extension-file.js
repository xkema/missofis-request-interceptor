// const path = require('path');
const manifestJSON = require('../extension/manifest.json');
const customizeManifestJSON = require('./customize-manifest-json');

// @todo filter based on node env (add map files for development)
const customizeExtensionFile = (file, targetBrowser) => {
  // console.log('___', file.name, targetBrowser.name);
  if(file.name === 'manifest.json') {
    return customizeManifestJSON(manifestJSON, targetBrowser);
  } else if(file.name.endsWith('.map')) {
    return false;
  } else if(file.name.startsWith('.')) {
    return false;
  }
  return true;
};

module.exports = customizeExtensionFile;