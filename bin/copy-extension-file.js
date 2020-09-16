const path = require('path');
const fs = require('fs-extra');
const getFileCustomization = require('./customize/get-file-customization.js');
const getBundleName = require('./get-bundle-name.js');
const targetBrowsers = require('./target-browsers.js');
const packageJSON = require('../package.json');

module.exports = (src, stats) => {
  if(stats.isFile()) {
    const fileCustomization = getFileCustomization(src);
    targetBrowsers.forEach((targetBrowser) => {
      const bundleName = getBundleName(packageJSON.name, targetBrowser.name, packageJSON.version);
      const dest = src.replace('/extension/', `/dist/${bundleName}/`);
      if(fileCustomization) {
        if(fileCustomization.filename === 'manifest.json') {
          const content = fileCustomization.customizer(src, targetBrowser);
          fs.outputJsonSync(dest, content, { spaces: 2 });
        } else if(fileCustomization.filename === 'intercepted-types.js') {
          const content = fileCustomization.customizer(src, targetBrowser);
          fs.outputFileSync(dest, content );
        }
      } else {
        fs.copySync(src, dest);
      }
    });
  }
};