//pass render-routes && routes in component if this will have children (set in CLI)
/**
 *
 * Root
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

//import Functional
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

//import Visual
import styled from 'styled-components';
import StyledRoot from './StyledRoot';

//import Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default class RootPage extends React.Component
{ // eslint-disable-line react/prefer-stateless-function

  constructor(props)
  {
    super(props);
    /**SHOW_FLOW_LOG**/
    console.log('Root Props:',props);
    /**END_SHOW_FLOW_LOG**/
  }

  componentWillMount()
  { /**SHOW_FLOW_LOG**/console.log('Root is mounting');/**END_SHOW_FLOW_LOG**/ }
  componentDidMount()
  { /**SHOW_FLOW_LOG**/console.log('Root mounted');/**END_SHOW_FLOW_LOG**/ }

  render()
  {
    /**SHOW_FLOW_LOG**/
    console.info(`/client/containers/Root/index.js: wrap <Route> and use this everywhere instead, then when
                  sub routes are added to any route it'll work`);
    /**END_SHOW_FLOW_LOG**/
    const RouteWithSubRoutes = (route) => (
      <Route exact={route.exact} path={route.path} render={props => (
        /**SHOW_FLOW_LOG**/// (pass the sub-routes down to keep nesting)/**END_SHOW_FLOW_LOG**/
        <route.component {...props} routes={route.routes}/>
      )}/>
    )

    return (
      <StyledRoot>
        <Header />
        <div className="optional-helper-text">
          <h3>*Root*</h3>
          2) FRONT-END (/client/index.js) - initial front-end entry point. Integrates into the server rendered page and inits React, ReactDOM, React Router, Redux and other Globals<br/>
          3) FRONT-END (/client/containers/Root/index.js) - Loaded into "/client/index.js" by "/client/routes.js"<br/>
           -=> This component is the skeleton around the actual pages, and should only contain code that should be seen on all pages. (e.g. navigation bar)
        </div>

        {this.props.route.routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))}

        <Footer author="mlnck" />
      </StyledRoot>
    );
  }
}

RootPage.defaultProps = {
  routes: []
};

RootPage.propTypes = {
  routes: PropTypes.array.isRequired
};
