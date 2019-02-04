const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  devtool: 'eval',
  entry: {
    landing: './frontend/src/apps/landing_/roots/subscription.js',
    // login: './frontend/src/login.js',
    // signup: './frontend/src/signup.js',
    // password_reset: './frontend/src/password_reset.js',
    // password_reset_confirm: './frontend/src/password_reset_confirm.js',
    application_form: './frontend/src/apps/stores/roots/application_form.js',
  },
  output: {
    path: __dirname + '/dist/webpack_bundles/',
    filename: '[name]-bundle.[hash].js',
  },
  plugins: [new BundleTracker({ filename: './webpack-stats.json' })],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'commons',
    },
  },
  resolve: {
    modules: [path.resolve('./frontend/src'), path.resolve('./node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|otf|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
      },
    ],
  },
  mode: 'development',
};
