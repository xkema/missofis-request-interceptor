const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');
const browsers = require('./includes/browsers.js');
const copyExtensionFiles = require('./includes/copy-extension-files.js');

// @see Changes on bin directory files, i.e. a browser.js customization, requires node scripts to be reset

// @todo make these terminal parameters
const bundler = true;
const targets = ['chrome', 'firefox'];

console.log('~ bundler\n');

// clear previous artifacts
fs.removeSync('dist');

// copy initial files
targets.forEach((target) => {
  const browser = browsers.find(browser => browser.name === target);
  copyExtensionFiles(path.resolve('extension'), browser, bundler);
});