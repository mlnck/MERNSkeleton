//pass render-routes && routes in component if this will have children (set in CLI)
/**
 *
 * Root
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

//import Functional
import React from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import routes from '../../routes';

//import Visual
import styled from 'styled-components';
import RootStyle from './RootStyle';

//import Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default class RootPage extends React.Component
{ // eslint-disable-line react/prefer-stateless-function
  componentDidMount()
  {
    console.log('Root mounted');
  }

  render()
{
  const route = routes;
    return (
      <RootStyle>
        <h1>Root</h1>
        <div className="optional-helper-text">
          2) FRONT-END (/client/index.js) - initial front-end entry point. Integrates into the server rendered page and inits React, ReactDOM, React Router, Redux and other Globals<br/>
          3) FRONT-END (/client/containers/Root/index.js) - Loaded into "/client/index.js" by "/client/routes/js"<br/>
           -=> This component is the skeleton around the actual pages, and should only contain code that should be seen on all pages. (e.g. navigation bar)
        </div>
        {/* child routes won't render without this */}
        {renderRoutes(route.routes)}
      </RootStyle>
    );
  }
}
