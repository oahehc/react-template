const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const appRootPath = require('app-root-dir').get();
console.log('ENV:', process.env.NODE_ENV);
module.exports = {
  entry: ['./app/index.js'],
  output: {
    path: `${__dirname}/dist`,
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-3']
        }
      }
    ]
  },
  devServer: {
    inline: true,
    port: 8008
  },
  resolve: {
    extensions: [
      '.scss', '.js', '.jsx', '.json'
    ],
    alias: {
      Api: path.resolve(appRootPath, './app/api'),
      Components: path.resolve(appRootPath, './app/components'),
      Containers: path.resolve(appRootPath, './app/containers'),
      Redux: path.resolve(appRootPath, './app/redux'),
      Routes: path.resolve(appRootPath, './app/routes'),
      Styles: path.resolve(appRootPath, './app/styles'),
      Toolbox: path.resolve(appRootPath, './app/toolbox'),
      Utils: path.resolve(appRootPath, './app/utils')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({template: `${__dirname}/app/index.html`, filename: 'index.html', inject: 'body'}),
    new webpack.DefinePlugin({
      DEV_MODE: process.env.NODE_ENV === 'development'
    })
  ]
};