//import Functional
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//import Visual
import StyledSkeleton from './StyledSkeleton';

//import Components
import Closet from '../../components/Closet';

//import actions
import { alterBone, createSagaSkeleton, deleteSagaSkeleton, searchSkeleton } from './state/actions';
//import selector
import { getAlteredState, getSkeletons, getFilteredBojangles, getSearchedSkeleton, getSearchTerm } from './state/selector';

//will need to toggle export for mapping dispatch/state below if need be (from CLI)
class Skeleton extends React.Component
{ // eslint-disable-line react/prefer-stateless-function
  constructor(props)
  {
    super(props);
    console.log('Skeleton Props:',props);
  }

  componentWillMount()
  { console.log('Skeleton is mounting'); }
  componentDidMount()
  { console.log('Skeleton mounted'); }

  render()
  {
    const skeletonProps = this.props;
    const closets = routingData[0].skeletonsByRoute.map((closetProps,indx)=>{
      return <Closet key={indx} {...closetProps} />
    });
    const allSkels = skeletonProps.skeletons.map((closetProps,indx)=>{
      return <Closet key={indx} title={closetProps.name} content={(closetProps.bojangles)?'Bojangles':'Nojangles'} {...closetProps} />
    });
    const filteredSkels = (!skeletonProps.filteredSkeletons) ? [] : skeletonProps.filteredSkeletons.map((closetProps,indx)=>{
      return <Closet key={indx} title={closetProps.name} content={(closetProps.bojangles)?'Bojangles':'Nojangles'} {...closetProps} />
    });
    const searchedSkels = (!skeletonProps.searchedSkeleton) ? [] : skeletonProps.searchedSkeleton.map((closetProps,indx)=>{
      return <Closet key={indx} title={closetProps.name} content={(closetProps.bojangles)?'Bojangles':'Nojangles'} {...closetProps} />
    });

    console.log('skeletonPropsskeletonPropsskeletonPropsskeletonPropsskeletonProps',skeletonProps);
    return (
      <StyledSkeleton>

        4) FRONT-END (/client/containers/Skeleton/index.js) - Loaded into "/client/containers/Root/index.js" by "/client/routes.js"<br/>
         -=> This component is now added to the "Root Component" due to the nesting defined in: "/client/routes.js"
        <br/><br/>
        <h4>*Skeleton Container - with browser variable: {skeletonProps.match.params.id || 'click "Test Route Variable" button'}*</h4>
          <a href="/skeletons/SKELETON%20BROWSER%20URL%20VARIABLE"><button>Test route variable</button></a>
        <br/><br/>
          {closets}
        <br/><br/>
        The bordered boxes above show a database call populating components through the route function in this stack.<br/>
        For an example using express routing click here:
          <a href="http://localhost:8000/api/skeletons" target="_blank">http://localhost:8000/api/skeletons</a>
        <br/><br/>
        All Skeletons are:<br/>
        {allSkels}
        <br/>Filtered Skeletons are:<br/>
        {filteredSkels}
        <br/>Searched Skeletons are:<br/>
        {searchedSkels}
        <br/><br/>
        In this example we are showing Memoization in the selector.
        Go ahead, give it a try and then see what is happening in: MERNSkeleton/client/containers/Skeleton/selector.js
        <br/>That is, a selector that is easy on the state when a change needs to happen to the returned data.

        <br/><br/>Currently, the altered bone data is:<b>{skeletonProps.alteredBoneState}</b><br/><br/>
        <br/>Go ahead and change it with the dropdown below
        <br/>(results may look random, but check the selector to see the logic)<br/>
        <select id="redux-example" onChange={skeletonProps.blanketChange}>
          <option value="NO_ALTERATIONS">no_alterations</option>
          <option value="ADD_BONE">add bone</option>
          <option value="REMOVE_BONE">remove bone</option>
          <option value="BREAK_BONE">break bone</option>
        </select>
        <br/><br/>
        And Memoizations can be used as a selector for another memoized selector.<br/>
        Try it out to: <span onClick={skeletonProps.searchSkeleton} data-searchon="Bone" style={{color:'blue',cursor:'pointer',textDecoration:'underline',fontVariant:'italic'}}>Find Bones&rsquo;</span>
        &nbsp;&mdash;&nbsp;<span onClick={skeletonProps.searchSkeleton} data-searchon="Fr" style={{color:'blue',cursor:'pointer',textDecoration:'underline',fontVariant:'italic'}}>Find Non-Bones&rsquo;</span>
        <br/><br/>
        Time for Sagas!<br/>
        Remember our previously pre-rendered components above?<br/>
        Well now, we will create a new one, async add it to mongo, and async add it to the state so it can show up alongside the rest!
        <br/> also, notice if you refresh the page, Tony will be added to the DOM without being in the state, because he really is in the database.
        <br/>(hint: you can tell if a skeleton is in the state ($) or not (xx) at a glance)
        <br/><br/>
        Here is what we are going to add:<br/>
        {`{`}<br/>
          {`skeletonName:'Tony',`}<br/>
          {`skeletonCaption:'bone apetit'`}<br/>
        }<br/>
        <button onClick={skeletonProps.createSagaSkeleton}>Save Me!</button>
        <br/><br/>
        Too many Tonys?<br/>
        And one last thing to note. Notice how if you add Tonys you have to refresh the page to see them in the non-state (xx) condition.<br/>
        That is because that block of code is pre-processed, anything that you do after the page loads will not update those elements once they are (or are not) on the stage.<br/>
        However, now that you have refreshed and you see the new Tonys up-top, go ahead and add another couple to the state, then delete them.<br/>
        Those in the state are gone, but not up-top. Well, until you refresh the page again. Go ahead and try it. No more Tonys will be on the stage at all.
        <br/>
        <button onClick={skeletonProps.deleteSagaSkeleton}>Delete {`'`}em!</button>

        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </StyledSkeleton>
    );
  }
}

Skeleton.defaultProps = {
  routes: []
};

Skeleton.propTypes = {
  routes: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps:->',state, ownProps);
  return {
    alteredBoneState: getAlteredState(state),
    skeletons: getSkeletons(state),
    filteredSkeletons: getFilteredBojangles(state),
    searchedSkeleton: getSearchedSkeleton(state),
    skeletonSearch: getSearchTerm(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('mapDispatchToProps:->',dispatch);
  return {
    blanketChange: (s) => { dispatch(alterBone(s.target.value)); },
    searchSkeleton: (s) => { dispatch(searchSkeleton(s.currentTarget.getAttribute('data-searchon'))); },
    createSagaSkeleton: (o) => { console.log('o',o); dispatch(createSagaSkeleton({skeletonName:'Tony',skeletonCaption:'bone apetit'})); },
    deleteSagaSkeleton: () => { dispatch(deleteSagaSkeleton()); }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Skeleton);
