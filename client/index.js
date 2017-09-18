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
import { qonsole } from 'qonsole';

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
/** show_sample_project **/
qonsole.debug(qonsole.NORM,'window.__INITIAL_STATE__','\tclient/index.js',window.__INITIAL_STATE__); // eslint-disable-line
/** end_show_sample_project **/
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
