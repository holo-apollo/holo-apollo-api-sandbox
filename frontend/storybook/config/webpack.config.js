const path = require('path');

module.exports = {
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '..', '..', 'src')],
  },
  module: {
    rules: [
      {
        test: /\.(png|woff|woff2|eot|otf|ttf|svg|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
      },
    ],
  },
};
