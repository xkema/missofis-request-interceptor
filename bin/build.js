const fs = require('fs-extra');
const filterCommonFiles = require('./filter-common-files.js');
const copyCustomizedFiles = require('./copy-customized-files.js');

const browser = 'chrome'; // "chrome", "firefox"

fs.copySync('extension', `dist/${browser}`, { filter: filterCommonFiles });

copyCustomizedFiles(browser);
