// var fs = require('fs');
var path = require('path');

module.exports = {

  entry: path.resolve(__dirname, '../../server/server.js'),

  output: {
    path: path.resolve(__dirname, '../../_build/'),
    filename: 'server.bundle.js',
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true,
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],
  },
  externals: {
    'fs':'fs',
    'fsevents':'fsevents',
    "aws-sdk":"aws-sdk",
    'path':'path'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'react',
            'es2015',
            'stage-0',
          ],
          plugins: [
            [
              'babel-plugin-webpack-loaders', {
                'config': path.resolve(__dirname, './webpack.babel.js'),
                "verbose": false
              }
            ]
          ]
        },
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};
