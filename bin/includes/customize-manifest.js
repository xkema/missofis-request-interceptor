const deepExtend = require('deep-extend');
const fs = require('fs-extra');

module.exports = (src, targetBrowser) => {
  const fileContent = fs.readJsonSync(src);
  return deepExtend({}, fileContent, targetBrowser.custom_manifest_keys)
};
