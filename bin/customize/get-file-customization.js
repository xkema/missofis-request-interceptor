const path = require('path');
const fileCustomizers = require('./file-customizers.js');

module.exports = (src) => {
  const basename = path.basename(src);
  return fileCustomizers.filter(fileCustomizer => fileCustomizer.filename === basename)[0];
};