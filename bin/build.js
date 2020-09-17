const path = require('path');
const chokidar = require('chokidar');
const browsers = require('./includes/browsers.js');
const copyExtensionFiles = require('./includes/copy-extension-files.js');
const copyExtensionFile = require('./includes/copy-extension-file.js');

// @todo make it a terminal parameter
const targets = ['chrome', 'firefox'];

console.log('~');

// copy initial files
targets.forEach((target) => {
  const browser = browsers.find(browser => browser.name === target);
  copyExtensionFiles(path.resolve('extension'), browser);
});

// watch & copy changed files
chokidar
  .watch('extension')
  .on('change', (filepath) => {
    console.log(`"${path.basename(filepath)}" changed`);
    targets.forEach((target) => {
      const browser = browsers.find(browser => browser.name === target);
      copyExtensionFile(path.resolve(filepath), browser);
    });
  });
 