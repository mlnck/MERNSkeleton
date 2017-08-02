//import Functional
import React from 'react';
import { connect } from 'react-redux';

//import Visual
import StyledHome from './StyledHome';
//components

export default class Home extends React.Component
{ // eslint-disable-line react/prefer-stateless-function
  componentDidMount()
  {

  }

  render()
  {
    const {  } = this.props;
    const homeProps = {

    };

    return (
      <StyledHome>
        <div className="optional-helper-text">
          <h4>*Home Container*</h4>
          4) FRONT-END (/client/containers/Home/index.js) - Loaded into "/client/containers/Root/index.js" by "/client/routes.js"<br/>
           -=> This component is now added to the "Root Component" due to the nesting defined in: "/client/routes.js"
        </div>
        <button>Test route variable</button>
        <button>Test Database Query</button>
      </StyledHome>
    );
  }
}

Home.defaultProps = {

};

Home.propTypes = {

};
