//import Functional
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//import Visual
import StyledXxx from './StyledXxx';

// import actions
//import {  } from './state/actions';
// import selector
//import {  } from './state/selector';

//import Components

//will need to toggle export for mapping dispatch/state below if need be (from CLI)
class Xxx extends React.Component
export default function Xxx(props)
{ // eslint-disable-line react/prefer-stateless-function
  constructor(props)
  {
    super(props);
    /** show_sample_project **/
    console.log('Xxx Props:',props);
    /** end_show_sample_project **/
  }

  componentWillMount()
  { /** show_sample_project **/console.log('Xxx is mounting');/** end_show_sample_project **/ }
  componentDidMount()
  { /** show_sample_project **/console.log('Xxx mounted');/** end_show_sample_project **/ }

  render()
  {
    const xxxProps = this.props;

    return (
      <StyledXxx>
        Xxx Container
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
