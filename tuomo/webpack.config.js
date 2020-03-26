const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const publicPath = process.env.NODE_ENV === 'development' ? '/tuomo/' : 'https://toska.dev/tuomo/'

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath,
  },
  devServer: {
    port: 3002,
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.jpg$/,
        use: 'file-loader',
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html'
    })
  ]
};