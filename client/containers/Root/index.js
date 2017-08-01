//pass render-routes && routes in component if this will have children (set in CLI)
//import Functional
import React from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import routes from '../../routes';

//import Visual
  //components
import styled from 'styled-components';
import RootStyle from './RootStyle';

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
        FRONTEND - INITIAL ENTRY POINT INITS REACT - LOADS CLIENT ROUTE(S) :: ROOT IS DEFAULT
        {/* child routes won't render without this */}
        {renderRoutes(route.routes)}
      </RootStyle>
    );
  }
}

// Wrap the component to inject dispatch and state into it
// export default RootPage;
