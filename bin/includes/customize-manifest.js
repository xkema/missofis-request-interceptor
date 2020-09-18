const deepExtend = require('deep-extend');
const fs = require('fs-extra');

module.exports = (src, browser) => {
  const fileContent = fs.readJsonSync(src);
  return deepExtend({}, fileContent, browser.custom_manifest_keys)
};
