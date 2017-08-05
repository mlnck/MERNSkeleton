//import Functional
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//import Visual
import StyledSkeleton from './StyledSkeleton';

//import Components
import Closet from '../../components/Closet';

//will need to toggle export for mapping dispatch/state below if need be (from CLI)
export default class Skeleton extends React.Component
{ // eslint-disable-line react/prefer-stateless-function
  constructor(props)
  {
    super(props);
    /**SHOW_FLOW_LOG**/
    console.log('Skeleton Props:',props);
    /**END_SHOW_FLOW_LOG**/
  }

  componentWillMount()
  { /**SHOW_FLOW_LOG**/console.log('Skeleton is mounting');/**END_SHOW_FLOW_LOG**/ }
  componentDidMount()
  { /**SHOW_FLOW_LOG**/console.log('Skeleton mounted');/**END_SHOW_FLOW_LOG**/ }

  render()
  {
    const skeletonProps = this.props;
    const loadComponent = skeletonProps.route[0].component;
    // const loadComponentFn = skeletonProps.route[0].component;
    console.log('loadComponent:',loadComponent());
    console.log('skeletonProps.route[0].component:',skeletonProps.route[0].component());
    return (
      <StyledSkeleton>

        <h4>*Skeleton Container - with browser variable: {skeletonProps.match.params.id}*</h4>
        4) FRONT-END (/client/containers/Skeleton/index.js) - Loaded into "/client/containers/Root/index.js" by "/client/routes.js"<br/>
         -=> This component is now added to the "Root Component" due to the nesting defined in: "/client/routes.js"
        <br/><br/>
        <button>Test route variable</button>
        <button>Test Database Query</button>
        <br/><br/>

        {/* will need to make the pass down function dynamic/reusable on all pages */}
        {/* and will need to use the following when we are at the last position */}
          <Closet {...skeletonProps} />
        {/* unless original function is supposed to auto/add components along the way -- which it may be */}
      </StyledSkeleton>
    );
  }
}

Skeleton.defaultProps = {
  routes: []
};

Skeleton.propTypes = {
  routes: PropTypes.array.isRequired
};
