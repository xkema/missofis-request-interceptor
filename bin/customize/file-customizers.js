module.exports = [{
  filename: 'manifest.json',
  customizer: require('./customize-manifest-json.js'),
}, {
  filename: 'intercepted-types.js',
  customizer: require('./customize-intercepted-types.js'),
}];
