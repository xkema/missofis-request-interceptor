const path = require('path');
const fs = require('fs-extra');
const zipdir = require('zip-dir');
const getBundleName = require('./get-bundle-name.js');
const targetBrowsers = require('./target-browsers.js');
const packageJSON = require('../package.json');

module.exports = () => {
  targetBrowsers.forEach((targetBrowser) => {
    const bundleName = getBundleName(packageJSON.name, targetBrowser.name, packageJSON.version);
    zipdir(`dist/${bundleName}`, {
      saveTo: `dist/${bundleName}.zip`
    }, (error, buffer) => {
      if(error) { console.log(error); }
    });
  });
};