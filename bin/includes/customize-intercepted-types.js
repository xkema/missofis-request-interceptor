const path = require('path');
const fs = require('fs-extra');

module.exports = (src, browser) => {
  let fileContent = fs.readFileSync(src, 'utf-8');
  if(Array.isArray(browser.custom_resource_types)) {
    let extendedTypesText = '';
    browser.custom_resource_types.forEach((extendedType, index, array) => {
      extendedTypesText += `  '${extendedType}',`;
      if(index !== array.length-1) {
        extendedTypesText += '\n';
      }
    });
    fileContent = fileContent.replace(/  \/\* <auto-generated-content> \*\//, extendedTypesText);
  } else {
    fileContent = fileContent.replace('<auto-generated-content>', '<nothing-to-add>');
  }
  return fileContent;
};
