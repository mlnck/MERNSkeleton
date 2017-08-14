/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store';

// Import CSS reset and Global Styles
import './global-styles';

// Import routes
import clientRoutes from '../client/routes';

// Create redux store with history
console.log('FROM INDEXJS window.__INITIAL_STATE__:',window.__INITIAL_STATE__);
const store = configureStore(window.__INITIAL_STATE__);

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        {/* kick it all off with the root route */}
        {renderRoutes(clientRoutes())}
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );


// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// if(process.env.NODE_ENV === 'production')
//{ require('offline-plugin/runtime').install(); // eslint-disable-line global-require }
