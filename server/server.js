import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import IntlWrapper from '../config/intl/client/IntlWrapper';
import basehtml from '../config/server/basehtml';

// Webpack Requirements
import webpack from 'webpack';
import config from '../config/webpack/webpack.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import configureStore from '../client/store';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Switch } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';

// Import required modules
import clientRoutes from '../client/routes';
import { fetchComponentData } from '../config/utils/server/fetchData';
import seedDB from '../config/utils/server/seed.db';
import serverConfig from '../config/server/conf';

//Server Side Routes:
  /**START_WITH_SAMPLE**/
  import skeletonRoutes from './routes/skeleton.routes';
  import * as SkeletonController from './controllers/skeleton.controller';
  /**END_START_WITH_SAMPLE**/

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) =>
{
  if(error)
  {
    console.error('Please make sure Mongodb is installed and running!', error); // eslint-disable-line no-console
    throw error;
  }
  console.log('Mongo running at:\n\t', serverConfig.mongoURL); // eslint-disable-line no-console
  // feed some dummy data in DB.
  if(process.env.MONGO_SEED === 'true')
  { seedDB(); }
  /**START_WITH_SAMPLE**/
  seedDB();
  /**END_START_WITH_SAMPLE**/
});

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist/client')));
// Server side routes app.use
/**START_WITH_SAMPLE**/
  app.use('/api', skeletonRoutes);
/**END_START_WITH_SAMPLE**/

const allRoutes = clientRoutes();
const renderFullPage = basehtml;

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

const loadBranchData = (location) => {
  const branch = matchRoutes(allRoutes, location);
  const promises = branch.map(({ route, match }) => {
    console.log('>',route);
    console.log('->',match);
    console.log('-->',route.loadData,'<------');
    return route.loadData
      ? eval(route.loadData)(match)
      : Promise.resolve(null)
  })
  console.log('promises:',promises);
  return Promise.all(promises)
}

app.use((req, res, next) => {
const store = configureStore();

  loadBranchData(req.url)
  .then((data) =>
  {
    data = data.filter((d)=>d!==null);
    console.log('rendering will go here')
    console.log(data);
    const context = {}

    const initialView = '<div className="optional-helper-text">This is being replaced by the client side</div>';
    const finalState = store.getState();
    console.log('finalState:',finalState);
    res
      .set('Content-Type', 'text/html')
      .set('data',data)
      .status(200)
      .end(renderFullPage(initialView, finalState, data));
  });
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
