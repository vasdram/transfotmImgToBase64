const test = require('./loaders/testLoader');
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  },

  module: {
    rules: [
      {
        test: /\.bmp/,
        use: ['testLoader', 'file-loader']
      }
    ]
  }
};
