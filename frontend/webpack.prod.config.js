const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

let commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'commons.[hash].js'
});

let definePlugin = new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('production')
    }
});

let uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin();

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
        commonsPlugin,
        definePlugin,
        uglifyJsPlugin,
        new BundleTracker({filename: './webpack-stats-prod.json'})
    ],
    resolve: {
        modules: [
            path.resolve('./frontend/src'),
            path.resolve('./node_modules')
        ]
    },
    module: {
        loaders: [
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
    }
};
