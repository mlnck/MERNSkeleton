import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
// import IntlWrapper from '../config/intl/client/IntlWrapper'; // enable if internationalization is required

// Webpack Requirements
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// React And Redux Setup
import { matchRoutes } from 'react-router-config';

// Relative imports
// • Webpack
import config from '../config/webpack/webpack.dev';
// • HTML
import basehtml from '../config/server/basehtml';
// • React And Redux
import configureStore from '../client/store';

// Import required modules
import clientRoutes from '../client/routes';
import seedDB from '../config/utils/server/seed.db';
import serverConfig from '../config/server/conf';

// Server Side Routes:
/** show_sample_project **/
import skeletonRoutes from './routes/skeleton.routes';
// these should come from server/controllers - accessing mongo and returning data requested by /clients/routes
import * as SkeletonController from './controllers/skeleton.controller'; // eslint-disable-line
/** end_show_sample_project **/


// Initialize the Express App
const app = new Express();

// Run Webpack dev server in development mode
if(process.env.NODE_ENV === 'development')
{
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, { useMongoClient: true }, (error) =>
{
  if(error)
  {
    console.error('Please make sure Mongodb is installed and running!', error); // eslint-disable-line
    throw error;
  }
  console.log('Mongo running at:\n\t', serverConfig.mongoURL); // eslint-disable-line
  // feed some dummy data in DB.
  if(process.env.MONGO_SEED === 'true')
  { seedDB(); }
  /** show_sample_project **/
  seedDB();
  /** end_show_sample_project **/
});

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Express.static(path.resolve(__dirname, '../_build/assets')));
app.use(Express.static(path.resolve(__dirname, '../client/_assets')));
/** show_sample_project **/
app.use('/api', skeletonRoutes);
/** end_show_sample_project **/

const allRoutes = clientRoutes();
const renderFullPage = basehtml;

const loadBranchData = (location) =>
{
  const branch = matchRoutes(allRoutes, location);
  const promises = branch.map(({ route, match }) =>
  {
    /** show_sample_project **/
    console.log('/server/server.js -- for backend routing we are matching on:');
    console.log('>', route);
    console.log('->', match);
    console.log('-->', route.loadDataFnc);
    /** end_show_sample_project **/
    if(route.loadDataFnc)
    {
      // following two lines are for react v4 object "pre-processed" routing
      match.dataKey = route.loadDataKey; // eslint-disable-line
      return eval(route.loadDataFnc)(match); // eslint-disable-line
    }
    return Promise.resolve(null); // eslint-disable no-param-reassign
  });
  /** show_sample_project **/console.log('All Promises Are:', promises);/** end_show_sample_project **/
  return Promise.all(promises);
};

app.use((req, res) =>
{
  const store = configureStore();

  loadBranchData(req.url)
    .then((data) =>
    {
      const branchData = data
        .filter((d) => d !== null)
        .map((d) =>
        {
          if(d.hasOwnProperty('dataKey'))
          {
            const o = {};
            o[d.dataKey] = d;
            console.log('o', o);
            return o;
          }
          return d;
        });
      const initialView = '<div className="optional-helper-text">This is being replaced by the client side</div>';
      const finalState = store.getState();

      /** show_sample_project **/
      if(true) // eslint-disable-line
      {
        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState, branchData));
        console.log(`The above will set the base data as an array,
          the below will set it as an object`);
      }
      else
      {
      /** end_show_sample_project **/
        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState, branchData[0]));
      /** show_sample_project **/
      }
      /** end_show_sample_project **/
    });
});

// start app
app.listen(serverConfig.port, (error) =>
{
  if(!error)
  {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
