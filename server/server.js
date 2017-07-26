import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import IntlWrapper from '../config/intl/client/IntlWrapper';

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
import { configureStore } from '../client/store'; //--> from react-boilerplate
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
// import { match, RouterContext } from 'react-router';
// import { StaticRouter, matchPath } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config'
import Helmet from 'react-helmet';

// Import required modules
import routes from '../client/routes';
import { fetchComponentData } from '../config/utils/server/fetchData';
import dummyData from '../config/utils/server/seed.db';
import serverConfig from '../config/utils/server/conf';

//Server Side Routes:
  //import posts from './routes/post.routes';

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
});

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist/client')));
// Server side routes app.use
  // app.use('/api', posts);

// TODO: Move this to it's own file in the server folder
// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production' ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Render Initial HTML
  //server and client rendering: https://stackoverflow.com/questions/42797543/whats-wrong-with-this-reactrouter-match-implementationf
  //https://github.com/technology-ebay-de/universal-react-router4/blob/master/src/server/render.js
  //https://ebaytech.berlin/universal-web-apps-with-react-router-4-15002bb30ccb
  //https://reacttraining.com/react-router/web/guides/server-rendering

////TMP
const Root = ({ route }) => (
  <div>
    <h1>Root</h1>
    {/* child routes won't render without this */}
    {renderRoutes(route.routes)}
  </div>
)
const Home = ({ route }) => (
  <div>
    <h2>Home</h2>
  </div>
)
const Skeleton = ({ route }) => (
  <div>
    <h2>Skeleton</h2>
    {/* child routes won't render without this */}
    {renderRoutes(route.routes, { someProp: 'these extra props are optional' })}
  </div>
)
const Closet = ({ someProp }) => (
  <div>
    <h3>Closet</h3>
    <div>{someProp}</div>
  </div>
)
///END TMP

//using react-router-config (https://www.npmjs.com/package/react-router-config) for react v4 routing
const homeFnc = ()=>{ return 'home fnc called'; }
const closetFnc = ()=>{ return 'closet fnc called'; }

const allRoutes = [
  {
    component: Root,
    routes: [
      { path: '/',
        exact: true,
        loadData:homeFnc,
        component: Home
      },
      { path: '/skeleton/:id',
        component: Skeleton,
        routes: [
          { path: '/skeleton/:id/closet',
            loadData:closetFnc,
            component: Closet
          }
        ]
      }
    ]
  }
]

const loadBranchData = (location) => {
  // const branch = matchRoutes(allRoutes, location.pathname)
  const branch = matchRoutes(allRoutes, location)
  console.log('location:',location);
  console.log('branch:',branch);
  console.log('-----xxxx-------');
  const promises = branch.map(({ route, match }) => {
    console.log('>',route);
    console.log('->',match);
    console.log('-->',route.loadData,'<------');
    return route.loadData
      ? route.loadData(match)
      : Promise.resolve(null)
  })
  console.log('promises:',promises);
  return Promise.all(promises)
}
// console.log('loadBranchData("/skeleton/23"):',loadBranchData("/skeleton/23"));
// console.log('------------');
// console.log('loadBranchData("/bob"):',loadBranchData("/bob"));
// console.log('------------');
// console.log('loadBranchData("/skeleton"):',loadBranchData("/skeleton"));
// console.log('------------');
// console.log('loadBranchData("/"):',loadBranchData("/"));
// console.log('------------');console.log('------------');

// useful on the server for preloading data
// loadBranchData(req.url).then(data => {
//   putTheDataSomewhereTheClientCanFindIt(data)
// })

app.use((req, res, next) => {
  // const store = configureStore();

  loadBranchData(req.url)
  .then((data) =>
  {
    console.log('rendering will go here')
    console.log(data);
    console.log('---');
  });

    // const match = allRoutes.reduce((acc, route) => matchPath(req.url, route, { exact: true }) || acc, null);
    // const branch = matchRoutes(allRoutes, '/skeleton/23')
    // console.log('match!:',branch);
    // if (!match) {
    //     res.status(404).send(render(<NoMatch />));
    //     return;
    // }
    // fetch('https://api.github.com/gists')
    //   .then(r => r.json())
    //   .then(gists => {
    //       res.status(200).send(render(
    //           (
    //               <Router context={{}} location={req.url}>
    //                   <App gists={gists} />
    //               </Router>
    //           ), gists
    //       ));
    //   }).catch(err => {
    //       console.error(err);
    //       res.status(500).send(render(<Error />));
    //   });
});

/*
app.get('*', (req, res) => {
    const match = routes.reduce((acc, route) => matchPath(req.url, route, { exact: true }) || acc, null);
    if (!match) {
        res.status(404).send(render(<NoMatch />));
        return;
    }
    fetch('https://api.github.com/gists')
        .then(r => r.json())
        .then(gists => {
            res.status(200).send(render(
                (
                    <Router context={{}} location={req.url}>
                        <App gists={gists} />
                    </Router>
                ), gists
            ));
        }).catch(err => {
            console.error(err);
            res.status(500).send(render(<Error />));
        });
});
*/

// // Server Side Rendering based on routes matched by React-router.
// app.use((req, res, next) => {
//   match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
//     if (err) {
//       return res.status(500).end(renderError(err));
//     }
//
//     if (redirectLocation) {
//       return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//     }
//
//     if (!renderProps) {
//       return next();
//     }
//
//     const store = configureStore();
//
//     return fetchComponentData(store, renderProps.components, renderProps.params)
//       .then(() => {
//         const initialView = renderToString(
//           <Provider store={store}>
//             <IntlWrapper>
//               <RouterContext {...renderProps} />
//             </IntlWrapper>
//           </Provider>
//         );
//         const finalState = store.getState();
//
//         res
//           .set('Content-Type', 'text/html')
//           .status(200)
//           .end(renderFullPage(initialView, finalState));
//       })
//       .catch((error) => next(error));
//   });
// });

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
