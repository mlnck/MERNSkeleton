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
    const closets = routingData[0].skeletonsByRoute.map((closetProps,indx)=>{
      return <Closet key={indx} {...closetProps} />
    })
    return (
      <StyledSkeleton>

        <h4>*Skeleton Container - with browser variable: {skeletonProps.match.params.id || 'click "Test Route Variable" button'}*</h4>
        4) FRONT-END (/client/containers/Skeleton/index.js) - Loaded into "/client/containers/Root/index.js" by "/client/routes.js"<br/>
         -=> This component is now added to the "Root Component" due to the nesting defined in: "/client/routes.js"
        <br/><br/>
        The bordered boxes below show a database call populating components through the route function in this stack.<br/>
        For an example using express routing click here:
          <a href="http://localhost:8000/api/skeletons" target="_blank">http://localhost:8000/api/skeletons</a>
        <br/><br/>
          {closets}
        <br/><br/>
          <a href="./skeletons/SKELETON%20BROWSER%20URL%20VARIABLE"><button>Test route variable</button></a>
          <button>Show Redux Example</button>
        <br/><br/>
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
