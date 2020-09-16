const path = require('path');
const fs = require('fs-extra');
const klaw = require('klaw');
const filterIrrelevantFiles = require('./filter-irrelevant-files.js');
const copyExtensionFile = require('./copy-extension-file.js');
const createBundleZip = require('./create-bundle-zip.js');

klaw('extension', { filter: filterIrrelevantFiles })
  .on('error', (error) => {
    console.log('~ on:error ~', error);
  })
  .on('data', (item) => {
    copyExtensionFile(item.path, item.stats);
  })
  .on('end', () => {
    createBundleZip();
  });