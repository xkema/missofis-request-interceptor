const path = require('path');
const fs = require('fs');

// const packageJSON = require('../package.json');

const generateBrowserSpecificDirectories = require('./generate-browser-specific-directories.js');
const targetBrowsers = require('./target-browsers.js');

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
