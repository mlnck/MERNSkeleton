//import Functional
import React from 'react';
import { connect } from 'react-redux';

//import Visual
import XxxStyle from './XxxStyle';
  //components

//will need to toggle export for mapping dispatch/state below if need be (from CLI)
export default class Xxx extends React.Component
{ // eslint-disable-line react/prefer-stateless-function
  constructor(props)
  {
    super(props);
    /**SHOW_FLOW_LOG**/
    console.log('Xxx props:',props);
    /**END_SHOW_FLOW_LOG**/
  }

  componentWillMount()
  { /**SHOW_FLOW_LOG**/console.log('Xxx is mounting');/**END_SHOW_FLOW_LOG**/ }
  componentDidMount()
  { /**SHOW_FLOW_LOG**/console.log('Xxx mounted');/**END_SHOW_FLOW_LOG**/ }

  render()
  {
    const {  } = this.props;
    const xxxProps = {

    };

    return (
      <StyledXxx>
        Xxx page
      </StyledXxx>
    );
  }
}

Xxx.defaultProps = {

};

Xxx.propTypes = {

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
