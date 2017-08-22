//import Functional
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//import Visual
import StyledSkeleton from './StyledSkeleton';

//import Components
import Closet from '../../components/Closet';

//import actions
import { alterBone } from './actions';
//import reducer
import { getAlteredState } from './reducer';

//will need to toggle export for mapping dispatch/state below if need be (from CLI)
class Skeleton extends React.Component
{ // eslint-disable-line react/prefer-stateless-function
  constructor(props)
  {
    super(props);
    console.log('Skeleton Props:',props);
  }

  componentWillMount()
  { console.log('Skeleton is mounting'); }
  componentDidMount()
  { console.log('Skeleton mounted'); }

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
          <a href="/skeletons/SKELETON%20BROWSER%20URL%20VARIABLE"><button>Test route variable</button></a>
        <br/><br/>
        <br/>Blanket redux example::: {skeletonProps.alteredBoneState}<br/>
        <select id="redux-example" onChange={skeletonProps.blanketChange}>
          <option value="NO_ALTERATIONS">no_alterations</option>
          <option value="ADD_BONE">add bone</option>
          <option value="REMOVE_BONE">remove bone</option>
          <option value="BREAK_BONE">break bone</option>
        </select>
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

const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps:->',state, ownProps);
  return {
    alteredBoneState: getAlteredState(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('mapDispatchToProps:->',dispatch);
  return {
    blanketChange: (s) => { console.log('alterbone',s.target.value); dispatch(alterBone(s.target.value)); }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Skeleton);
