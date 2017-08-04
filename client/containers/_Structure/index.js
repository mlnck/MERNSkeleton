//import Functional
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//import Visual
import StyledXxx from './StyledXxx';

//import Components

//will need to toggle export for mapping dispatch/state below if need be (from CLI)
export default class Xxx extends React.Component
{ // eslint-disable-line react/prefer-stateless-function
  constructor(props)
  {
    super(props);
    /**SHOW_FLOW_LOG**/
    console.log('Xxx Props:',props);
    /**END_SHOW_FLOW_LOG**/
  }

  componentWillMount()
  { /**SHOW_FLOW_LOG**/console.log('Xxx is mounting');/**END_SHOW_FLOW_LOG**/ }
  componentDidMount()
  { /**SHOW_FLOW_LOG**/console.log('Xxx mounted');/**END_SHOW_FLOW_LOG**/ }

  render()
  {
    const xxxProps = this.props;

    return (
      <StyledXxx>
        Xxx page
      </StyledXxx>
    );
  }
}

Xxx.defaultProps = {
  route: {}
};

Xxx.propTypes = {
  route: PropTypes.object.isRequired
};

export function mapDispatchToProps(dispatch)
{
  return {
  };
}

const mapStateToProps = createStructuredSelector({

});

//will need to toggle export for mapping dispatch/state above if need be (from CLI)
// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Xxx);
