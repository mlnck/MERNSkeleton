// import Functional
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { qonsole } from 'qonsole';

// import Visual
import StyledSkeleton from './StyledSkeleton';

// import Components
import Closet from '../../components/Closet';

// import actions
import { alterBone, createSagaSkeleton, deleteSagaSkeleton, searchSkeleton } from './state/actions';
// import selector
import { getAlteredState, getSkeletons, getFilteredBojangles, getSearchedSkeleton, getSearchTerm } from './state/selector';

class Skeleton extends React.Component
{ // eslint-disable-line react/prefer-stateless-function
  constructor(props)
  {
    super(props);
    qonsole.debug(qonsole.NORM, 'Skeleton Props (from constructor):', props);
  }

  componentWillMount()
  {
    const routingData = routingData; /* eslint-disable no-undef */ // routingData is coming from "pre-processed db call"
    qonsole.debug(qonsole.NORM, 'Skeleton is mounting');
  }
  componentDidMount()
  { qonsole.debug(qonsole.NORM, 'Skeleton mounted'); }

  render()
  {
    const skeletonProps = this.props;
    const closets = routingData[0].skeletonsByRoute.map((closetProps, indx) =>
      <Closet key={indx} {...closetProps} />);
    const allSkels = skeletonProps.skeletons.map((closetProps, indx) =>
      <Closet key={indx} title={closetProps.name} content={(closetProps.bojangles) ? 'Bojangles' : 'Nojangles'} {...closetProps} />);
    const filteredSkels = (!skeletonProps.filteredSkeletons) ? [] : skeletonProps.filteredSkeletons.map((closetProps, indx) =>
      <Closet key={indx} title={closetProps.name} content={(closetProps.bojangles) ? 'Bojangles' : 'Nojangles'} {...closetProps} />);
    const searchedSkels = (!skeletonProps.searchedSkeleton) ? [] : skeletonProps.searchedSkeleton.map((closetProps, indx) =>
      <Closet key={indx} title={closetProps.name} content={(closetProps.bojangles) ? 'Bojangles' : 'Nojangles'} {...closetProps} />);

    qonsole.debug('skeletonProps', skeletonProps);
    return (
      <div>
        <div className="optional-helper-text">
          <h3>*Skeleton*</h3>
          4) FRONT-END (/client/containers/Skeleton/index.js) - Loaded into "/client/containers/Root/index.js" by "/client/routes.js"<br />
           -=> This component is now added to the "Root Component" due to the nesting defined in: "/client/routes.js"
        </div>
        <StyledSkeleton>
          <br /><br />
          <b style={{ margin: '5px auto' }}>*Skeleton Container - with param variable:*</b>
          <br />
          {skeletonProps.match.params.id || 'click "Test Route Variable" button to see this value change with regards to the URL'}
          <br />
          <a style={{ display: 'block', margin: '5px auto' }} href="/skeletons/I%20AM%20GETTING%20POPULATED%20BY%20THE%20URL"><button>Test route variable</button></a>
          <br /><br />
          {closets}
          <br /><br />
          The bordered boxes above show a database call populating components through the <i>static</i> route function in this stack.
          <br />
          This is <b><i>not</i></b> available in the state.
          <br />
          For an example using express routing click here:<br />
          &nbsp;&nbsp;&nbsp;<a href="http://localhost:8000/api/skeletons" target="_blank">http://localhost:8000/api/skeletons</a>
          <br /><br />
          Now we will dispatch some actions from the store itself (look in the
          &nbsp;<a href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi" target="_blank">react</a>&nbsp;
             and <a href="http://extension.remotedev.io/" target="_blank">redux</a> chrome extensions or open up the console and browse for the comment "dispatched action from store changes state to:")
             which will update the state with some interactive information we see below.
          <br /><br />
          All Skeletons are:<br />
          {allSkels}
          <br />Filtered Skeletons are:<br />
          {filteredSkels}
          <br />Searched Skeletons are:<br />
          {searchedSkels}
          <br /><br />
          In this example we are showing <a href="https://www.npmjs.com/package/reselect" target="_blank">Memoization</a> in the selector.
          Go ahead, give it a try and then see what is happening in: /client/containers/Skeleton/selector.js
          <br />That is, a selector that is easy on the state when a change needs to happen to the returned data.

          <br /><br />Currently, the altered bone data is:<br />&nbsp;&nbsp;&nbsp;<b>{skeletonProps.alteredBoneState}</b><br /><br />
          <br />Go ahead and change it with the dropdown below
          <br />(results may look random, but check the selector to see the logic)<br />
          <select id="redux-example" onBlur={skeletonProps.blanketChange} onChange={skeletonProps.blanketChange}>
            <option value="NO_ALTERATIONS">no_alterations</option>
            <option value="ADD_BONE">add bone</option>
            <option value="REMOVE_BONE">remove bone</option>
            <option value="BREAK_BONE">break bone</option>
          </select>
          <br /><br />
          And Memoizations can be used as a selector for another memoized selector.<br />
          Try it out to: <button onClick={skeletonProps.searchSkeleton} onKeyDown={skeletonProps.searchSkeleton} data-searchon="Bone">Find Bones&rsquo;</button>
          &nbsp;&mdash;&nbsp;<button onClick={skeletonProps.searchSkeleton} onKeyDown={skeletonProps.searchSkeleton} data-searchon="Fr">Find Non-Bones&rsquo;</button>
          <br /><br />
          Time for <a href="https://redux-saga.js.org/" target="_blank">Sagas</a>!<br />
          Remember our previously pre-rendered components above?<br />
          Well now, we will create a new one, async add it to mongo, and async add it to the state so it can show up alongside the rest!<br />
          <br /> also, notice if you refresh the page, Tony will be added to the DOM without being in the state, because he really is in the database.
          <br /><br />
          Here is what we are going to add:<br />
          <pre>
            {'{'}<br />
            {'   skeletonName:\'Tony\','}<br />
            {'   skeletonCaption:\'bone apetit\''}<br />
          }<br />
          </pre>
          <button onClick={skeletonProps.createSagaSkeleton}>Save Me!</button>
          <br /><br />
          Too many Tonys?<br />
          And one last thing to note. Notice how if you add Tonys you have to refresh the page to see them in the non-state (prop is static) condition.<br />
          That is because that block of code is pre-processed, anything that you do after the page loads will not update those elements once they are (or are not) on the stage.<br />
          However, now that you have refreshed and you see the new Tonys up-top, go ahead and add another couple to the state, then delete them.<br />
          Those in the state are gone, but not up-top. Well, until you refresh the page again. Go ahead and try it. No more Tonys will be on the stage at all.
          <br /><br />
          <button onClick={skeletonProps.deleteSagaSkeleton}>Delete {'\''}em!</button>

          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </StyledSkeleton>
      </div>
    );
  }
}

Skeleton.defaultProps = {
  routes: []
};

Skeleton.propTypes = {
  routes: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) =>
{
  qonsole.isLevel(qonsole.NORM).debug(qonsole.INFO, 'mapStateToProps:->', state, ownProps);
  return {
    alteredBoneState: getAlteredState(state),
    skeletons: getSkeletons(state),
    filteredSkeletons: getFilteredBojangles(state),
    searchedSkeleton: getSearchedSkeleton(state),
    skeletonSearch: getSearchTerm(state)
  };
};

const mapDispatchToProps = (dispatch) =>
{
  qonsole.isLevel(qonsole.NORM).debug(qonsole.INFO, 'mapDispatchToProps:->', dispatch);
  return {
    blanketChange: (s) => { dispatch(alterBone(s.target.value)); },
    searchSkeleton: (s) => { dispatch(searchSkeleton(s.currentTarget.getAttribute('data-searchon'))); },
    createSagaSkeleton: (o) => { qonsole.debug('dispatching from this obj:', o); dispatch(createSagaSkeleton({ skeletonName: 'Tony', skeletonCaption: 'bone apetit' })); },
    deleteSagaSkeleton: () => { dispatch(deleteSagaSkeleton()); }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Skeleton);
