/**
 * App Entry Script
 */

require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  process.env.webpackAssets = JSON.stringify(require('./_build/client/manifest.json'));
  process.env.webpackChunkAssets = JSON.stringify(require('./_build/client/chunk-manifest.json'));

  console.log('search in serverbundle');
  console.log('you need to move this file with the current conditional block to _build');
  console.log('then you need to run node _build/inex.js from the package.json file');
  console.log('even if it doesn\'t work right away, all files will be in the same place');
  console.log('MAKE SURE TO UPDATE THE REQUIRE PATH BELOW');
  console.log('-------->',process.env.webpackAssets);
  // var tst0 = require(process.env.webpackAssets['/vendor.js']).catch((e)=>console.log('verrr:',e));
  // var tst = require(process.env.webpackAssets['/app.js']).catch((e)=>console.log('errr:',e));
  // console.log('======>',tst0,tst);

  // In production, serve the webpacked server file.
  // require('./server.bundle.js');
  require('./server/server');
} else {
  // Babel polyfill to convert ES6 code in runtime
  require('babel-register')({
    "plugins": [
      [
        "babel-plugin-webpack-loaders",
        {
          "config": "./config/webpack/webpack.babel.js",
          "verbose": false
        }
      ]
    ]
  });
  require('babel-polyfill');

  require('./server/server');
}
