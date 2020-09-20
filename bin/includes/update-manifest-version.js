const deepExtend = require('deep-extend');
const fs = require('fs-extra');

const version = process.argv.slice(2)[0].split('=')[1];
const fileContent = fs.readJsonSync('extension/manifest.json');
const content = deepExtend({}, fileContent, { version: version });
fs.outputJsonSync('extension/manifest.json', content, { spaces: 2 });
