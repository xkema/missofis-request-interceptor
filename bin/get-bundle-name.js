const path = require('path');

/**
 * Generates a bundle name from name, browser and version strings
 * @param {string} name - Name string from package.json
 * @param {string} browser - Name string from target browsers object
 * @param {string} vesion - Version string from package file
 * @returns {string} A package name for bundled zip
 */
module.exports = (name, browser, version) => `${name}-${browser}-${version}`;
