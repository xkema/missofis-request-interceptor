const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');
const browsers = require('./includes/browsers.js');
const copyExtensionFiles = require('./includes/copy-extension-files.js');

// @todo add units tests to the bundler

// @todo make it a terminal parameter
const bundler = true;
const targets = ['chrome', 'firefox'];

console.log('~ bundler');

// clear previous artifats
fs.removeSync('dist');

// copy initial files
targets.forEach((target) => {
  const browser = browsers.find(browser => browser.name === target);
  copyExtensionFiles(path.resolve('extension'), browser, bundler);
});