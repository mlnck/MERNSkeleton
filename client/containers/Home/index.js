// import Functional
import React from 'react';

// import Visual
import StyledHome from './StyledHome';
// components

export default class Home extends React.Component
{ // eslint-disable-line react/prefer-stateless-function
  constructor(props)
  {
    super(props);
    /** SHOW_FLOW_LOG**/
    console.log('Home Props:', props);
    /** END_SHOW_FLOW_LOG**/
  }

  componentWillMount()
  { /** SHOW_FLOW_LOG**/console.log('Home is mounting');/** END_SHOW_FLOW_LOG**/ }
  componentDidMount()
  { /** SHOW_FLOW_LOG**/console.log('Home mounted');/** END_SHOW_FLOW_LOG**/ }

  render()
  {
    return (
      <StyledHome>
        <div className="optional-helper-text">
          <h4>*Home Container*</h4>
          4) FRONT-END (/client/containers/Home/index.js) - Loaded into "/client/containers/Root/index.js" by "/client/routes.js"<br />
           -=> This component is now added to the "Root Component" due to the nesting defined in: "/client/routes.js"
          <br /><br />
          <a href="./skeletons">Check out the skeletons route</a>
        </div>
      </StyledHome>
    );
  }
}
