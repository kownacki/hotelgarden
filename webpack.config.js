const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/hg-menu.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'hg-menu.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/index.html', to: './' },
      { from: 'src/styles.css', to: './' },
    ]),
  ],
};