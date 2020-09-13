var deepExtend = require('deep-extend');

const customizeManifestJSON = (manifestJSON, targetBrowser) => {
  return JSON.stringify(deepExtend({}, manifestJSON, targetBrowser.manifest_keys), null, 2);
};

module.exports = customizeManifestJSON;