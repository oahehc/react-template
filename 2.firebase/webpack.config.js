const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const path = require('path');
const appRootPath = require('app-root-dir').get();

const isDev = process.env.NODE_ENV === 'development';
console.log('ENV:', process.env.NODE_ENV);

module.exports = {
  entry: removeEmpty([
    (isDev)
      ? 'webpack-dev-server/client?http://localhost:8008'
      : '',
    (isDev)
      ? 'webpack/hot/only-dev-server'
      : '',
    path.resolve(__dirname, './app/index.js'),
  ]),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
      // javascript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015', 'react', 'stage-0',
          ],
          plugins: removeEmpty([
            (isDev)
              ? 'react-hot-loader/babel'
              : '',
            'transform-object-rest-spread',
            'transform-es2015-destructuring',
            'transform-decorators-legacy',
            'transform-class-properties',
          ])
        }
      },
      // SCSS, TODO: seperate node_modules version, remove hash
      {
        test: /\.(scss|css)$/,
        include: [
          path.resolve(appRootPath, './app'),
          '/node_modules/',
        ],
        use: (isDev)
          ? [
            {
              loader: 'style-loader',
            }, {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
            }, {
              loader: 'postcss-loader',
            }, {
              loader: 'sass-loader',
            },
          ]
          : ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[name]_[local]_[hash:base64:5]',
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          }),
      },
      // Images / Fonts
      {
        test: /\.(jpg|jpeg|png|gif|ico|eot|svg|ttf|woff|woff2|otf)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          emitFile: true,
        },
      },
    ],
  },
  devServer: {
    inline: true,
    port: 8008,
  },
  resolve: {
    extensions: [
      '.scss', '.js', '.jsx', '.json',
    ],
    alias: {
      Assets: path.resolve(appRootPath, './app/assets'),
      Api: path.resolve(appRootPath, './app/api'),
      Components: path.resolve(appRootPath, './app/components'),
      Containers: path.resolve(appRootPath, './app/containers'),
      Redux: path.resolve(appRootPath, './app/redux'),
      Routes: path.resolve(appRootPath, './app/routes'),
      Styles: path.resolve(appRootPath, './app/styles'),
      Toolbox: path.resolve(appRootPath, './app/toolbox'),
      Utils: path.resolve(appRootPath, './app/utils'),
    },
  },
  devtool: (isDev)
    ? 'source-map'
    : 'hidden-source-map', // eval
  plugins: removeEmpty([
    new HtmlWebpackPlugin({
      template: `${__dirname}/app/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
    new AutoDllPlugin({
      inject: true,
      debug: isDev,
      filename: '[name]_[hash].js',
      path: './dll',
      entry: {
        vendor: [
          'react',
          'react-dom',
          'lodash',
          'immutable',
          'react-redux',
          'react-router-dom',
          'redux',
          'redux-immutable',
          'redux-thunk',
        ],
      },
    }),
    new webpack.DefinePlugin({ isDev }),
    (!isDev)
      ? new ExtractTextPlugin({ filename: '[name]-[hash].css', allChunks: true })
      : '',
    (isDev)
      ? new webpack.NoEmitOnErrorsPlugin()
      : '',
  ]),
};

function removeEmpty(x) {
  return x.filter(y => !!y);
}