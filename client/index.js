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
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import ReactGA from 'react-ga';

import configureStore from './store';

// Import CSS reset and Global Styles
import './global-styles';

// Import routes
import clientRoutes from '../client/routes';

// Google Analytic Tracking
ReactGA.initialize('UA-000000-01', {
  debug: true,
  titleCase: false,
  gaOptions: {
    userId: 123
  }
});

function logPageView()
{
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

// Create redux store with history
/* SHOW_FLOW_LOG */
console.log('FROM INDEXJS window.__INITIAL_STATE__:', window.__INITIAL_STATE__); // eslint-disable-line
/* END_SHOW_FLOW_LOG */
const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter onUpdate={logPageView}>
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
// { require('offline-plugin/runtime').install(); // eslint-disable-line global-require }
