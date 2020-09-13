const path = require('path');
const fs = require('fs');

// const packageJSON = require('../package.json');

const targetBrowsers = require('./target-browsers.js');
const generateBrowserSpecificDirectories = require('./generate-browser-specific-directories.js');
const customizeExtensionFile = require('./customize-extension-file.js');
const customizeManifestJSON = require('./customize-manifest-json.js');

fs.rmdirSync(path.resolve(__dirname, '..', 'dist/temp'), { recursive: true });
console.clear();

const extensionDir = path.resolve(__dirname, '..', 'extension');
const tempDir = path.resolve(__dirname, '..', 'dist/temp');

console.log('\r\n--------------------\r\n');

// create initial extension directories for development
targetBrowsers.forEach((targetBrowser) => {
  const browserDir = path.join(tempDir, targetBrowser.name);
  generateBrowserSpecificDirectories(extensionDir, browserDir, targetBrowser);
  console.log('\r\n--------------------\r\n');
});

// watch extension files and copy target on changes
// @see https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_filename_argument
let hasActiveFileChange = false;
fs.watch(extensionDir, { recursive: true }, (eventType, filename) => {
  if (filename) {
    if(!hasActiveFileChange) {
      // throttle changes
      hasActiveFileChange = true;
      const timerId = global.setTimeout(() => {
        hasActiveFileChange = false;
        global.clearTimeout(timerId);
      }, 1000);
      // copy changed file      
      targetBrowsers.forEach((targetBrowser) => {
        const srcFilePath = path.join(extensionDir, filename);
        const destFilePath = path.join(tempDir, targetBrowser.name, filename);
        const customization = customizeExtensionFile(path.basename(filename), targetBrowser);
        if(typeof customization === 'string') {
          fs.writeFileSync(destFilePath, customization);
          console.log(`copied with customization => "${srcFilePath}"`);
        } else if(customization === true) {
          fs.copyFileSync(srcFilePath, destFilePath);
          console.log(`copied as is => "${srcFilePath}"`);
        } else {
          console.log(`skipped => "${srcFilePath}"`);
        }
      });
    }
  }
});