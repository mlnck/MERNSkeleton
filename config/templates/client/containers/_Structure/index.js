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
      <div>
        Xxx Container
      </div>
    );
  }
}

Xxx.defaultProps = {
  route: {}
};

Xxx.propTypes = {
  route: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) =>
{
  return {
  };
}

const mapStateToProps = (state, ownProps) =>
{
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Xxx);
