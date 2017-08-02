//import Functional
import React from 'react';
import { connect } from 'react-redux';

//import Visual
import xxxStyle from './XxxStyle';
  //components

//will need to toggle export for mapping dispatch/state below if need be (from CLI)
export default class Xxx extends React.Component
{ // eslint-disable-line react/prefer-stateless-function
  componentDidMount()
  {

  }

  render()
{
    const {  } = this.props;
    const xxxProps = {

    };

    return (

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
