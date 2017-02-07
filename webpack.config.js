// get required packages
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CommonsChunkPlugin = require('./node_modules/webpack/lib/optimize/CommonsChunkPlugin.js');

// define settings
const commonChunks = new CommonsChunkPlugin({
  name: 'utils',
  filename: 'utils.js'
});
const copyAssets = new CopyWebpackPlugin([
  {from: './src/templates/_options.html', to: '../pages/options.html'},
  {from: './src/templates/_popup.html', to: '../pages/popup.html'},
  {from: './src/css/style.css', to: '../css/style.css'},
  {from: './node_modules/spectre.css/dist/spectre.css', to: '../css/spectre.css'},
  {from: './src/manifest.json', to: '../manifest.json'}
]);

// define config
const config = {
  entry: {
    background: './src/js/background.js',
    popup: './src/js/popup.js',
    options: './src/js/options.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'js'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
        resource: {
          test: /\.js$/,
          include: [path.resolve(__dirname, 'src', 'js')]
        },
        use: [{
          loader: 'babel-loader',
          options: {presets: ['es2015']}
        }]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    commonChunks,
    copyAssets
  ]
};

// export stuff :)
module.exports = config;