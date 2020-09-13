const path = require('path');
const fs = require('fs');

const customizeExtensionFile = require('./customize-extension-file.js');

// 
const generateBrowserSpecificDirectories = (src, dest, targetBrowser) => {
  const files = fs.readdirSync(src, { withFileTypes: true });
  files.forEach((file) => {
    const srcFilePath = path.join(src, file.name);
    const destFilePath = path.join(dest, file.name);
    if(file.isDirectory()) {
      fs.mkdirSync(destFilePath, { recursive: true });
      generateBrowserSpecificDirectories(srcFilePath, destFilePath, targetBrowser);
    } else if(file.isFile()) {
      const customization = customizeExtensionFile(file.name, targetBrowser);
      if(typeof customization === 'string') {
        fs.writeFileSync(destFilePath, customization);
        console.log(`copied with customization => "${srcFilePath}"`);
      } else if(customization === true) {
        fs.copyFileSync(srcFilePath, destFilePath);
        console.log(`copied as is => "${srcFilePath}"`);
      } else {
        console.log(`skipped => "${srcFilePath}"`);
      }
    }
  });
};

module.exports = generateBrowserSpecificDirectories;