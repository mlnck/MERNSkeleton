/**
 * Component Description from cli
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StyledXxx from './StyledXxx';

// import actions
//import {  } from './state/actions';
// import selector
//import {  } from './state/selector';

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

  return (
    <div>
      // {props.prop}
    </div>
  );
}

Xxx.defaultProps = {
  // prop: 'prop',
};

Xxx.propTypes = {
  // prop: PropTypes.string,
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
