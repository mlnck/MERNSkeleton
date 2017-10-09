// pass render-routes && routes in component if this will have children (set in CLI)
/**
 *
 * Root
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

// import Functional
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
/** show_sample_project **/
import { qonsole } from 'qonsole'; //eslint-disable-line
/** end_show_sample_project **/

// import Visual
import StyledRoot from './StyledRoot';

// import Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default class RootPage extends React.Component
{ // eslint-disable-line react/prefer-stateless-function
  constructor(props)
  {
    super(props);
    /** show_sample_project **/
    qonsole.debug(qonsole.NORM, 'Root Props:', props);
    /** end_show_sample_project **/
  }

  componentWillMount()
  { /** show_sample_project **/qonsole.debug(qonsole.NORM, 'Root is mounting');/** end_show_sample_project **/ }
  componentDidMount()
  { /** show_sample_project **/qonsole.debug(qonsole.NORM, 'Root mounted');/** end_show_sample_project **/ }

  render()
  {
    /** show_sample_project **/
    qonsole.debug(qonsole.NORM, 'FRONT-END', '\t(/client/containers/Skeleton/index.js)',
      '/client/containers/Root/index.js: wrap <Route> and use this everywhere instead',
      ', then when sub routes are added to any route it\'ll work');
    /** end_show_sample_project **/
    const RouteWithSubRoutes = (route) => (
      <Route
        exact={route.exact}
        path={route.path}
        render={(props) => (
        /** show_sample_project **/// (pass the sub-routes down to keep nesting)/** end_show_sample_project **/
          <route.component {...props} route={route.routes} />
        )}
      />
    );

    return (
      <StyledRoot>
        <Header />
        <div className="optional-helper-text root-optional-helper-text /** show_sample_project **/">
          <h3>*Root*</h3>
          2) FRONT-END (/client/index.js) - initial front-end entry point. Integrates into the server rendered page and inits React, ReactDOM, React Router, Redux and other Globals<br />
        </div>
        <div className="optional-helper-text root-optional-helper-text /** show_sample_project **/">
          <h3>*Root*</h3>
          3) FRONT-END (/client/containers/Root/index.js) - Loaded into "/client/index.js" by "/client/routes.js"<br />
           -=> This component is the skeleton around the actual pages, and should only contain code that should be seen on all pages. (e.g. navigation bar)
        </div>

        {this.props.route.routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}

        <Footer author="mlnck" />
      </StyledRoot>
    );
  }
}

RootPage.defaultProps = {
  route: []
};

RootPage.propTypes = {
  route: PropTypes.object.isRequired
};
