/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';

export default {

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        cacheDirectory: true,
        presets: ['react', 'stage-0'],
        plugins: ['add-module-exports', 'dynamic-import-webpack'],
        env: {
          production: {
            presets: ['react-optimize'],
            plugins: ['transform-runtime', 'babel-plugin-dev-expression']
          },
          development: {
            plugins: [
              'transform-decorators-legacy',
              'transform-class-properties',
              'transform-es2015-classes',
              'react-hot-loader/babel'
            ]
          }
        },
      },
    }]
  },

  output: {
    path: path.join(__dirname, 'src'),
    filename: 'bundle.js',
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
  },

  plugins: [
    new webpack.IgnorePlugin(/vertx/),
    new webpack.NamedModulesPlugin(),
  ],
};
