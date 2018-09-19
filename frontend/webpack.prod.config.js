const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let definePlugin = new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('production')
    }
});

module.exports = {
    entry: {
        landing: './frontend/src/landing.js',
        login: './frontend/src/login.js',
        signup: './frontend/src/signup.js',
        password_reset: './frontend/src/password_reset.js',
        password_reset_confirm: './frontend/src/password_reset_confirm.js'
    },
    output: {
        path: __dirname + '/build/webpack_bundles/',
        filename: '[name]-bundle.[hash].js'
    },
    plugins: [
        definePlugin,
        new BundleTracker({filename: './webpack-stats-prod.json'})
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'commons'
      },
      minimizer: [new UglifyJsPlugin()]
    },
    resolve: {
        modules: [
            path.resolve('./frontend/src'),
            path.resolve('./node_modules')
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|otf|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader'
            }
        ]
    },
    mode: 'production'
};
