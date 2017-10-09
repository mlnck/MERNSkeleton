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
    /** show_sample_project **/
    console.log('Home Props:', props);
    /** end_show_sample_project **/
  }

  componentWillMount()
  { /** show_sample_project **/console.log('Home is mounting');/** end_show_sample_project **/ }
  componentDidMount()
  { /** show_sample_project **/console.log('Home mounted');/** end_show_sample_project **/ }

  render()
  {
    return (
      <StyledHome>
        <div className="optional-helper-text">
          <h3>*Home Container*</h3>
          4) FRONT-END (/client/containers/Home/index.js) - Loaded into "/client/containers/Root/index.js" by "/client/routes.js"<br />
           -=> This component is now added to the "Root Component" due to the nesting defined in: "/client/routes.js"
          <br /><br />
          <a href="./skeletons">Check out the skeletons route</a>
        </div>
      </StyledHome>
    );
  }
}
