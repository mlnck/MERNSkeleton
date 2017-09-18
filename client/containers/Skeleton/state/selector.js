import { createSelector } from 'reselect';
/** show_sample_project **/
import { qonsole } from 'qonsole';
qonsole.debug(qonsole.NORM, 'REDUX', '\tMERNSkeleton/client/containers/Skeleton/state/selector.js', '\t\tCreate selectors to be used from the ./index.js file');
/** end_show_sample_project **/

export const getAlteredState = (state) =>
{
  qonsole.debug(qonsole.NORM, 'We use selectors to filter to the correct piece of information when receiving the data in the component',
    'For instance, if we were just to try to access the state we would see:', state,
    'Instead, we use the selector to filter out the extaneous information that we do not need and return:', state._root.entries[2][1].alterBones);

  const tmp = state._root.entries,
    ret = tmp.filter((itm) => itm[0] === 'skeleton');

  return (ret) ? ret[0][1].alterBones : '';
};

export const getSkeletons = (state) =>
{
  const tmp = state._root.entries,
    ret = tmp.filter((itm) => itm[0] === 'skeleton');
  return (ret) ? ret[0][1].skeletons : [];
};

export const getSearchTerm = (state) =>
{
  const tmp = state._root.entries,
    ret = tmp.filter((itm) => itm[0] === 'skeleton');
  return (ret) ? ret[0][1].skeletonSearch : '';
};

// export const getFilteredBojangles = () =>{console.log('non breaking'); return []}
export const getFilteredBojangles = createSelector(
  [getAlteredState, getSkeletons], // use the results of these for our return logic
  (alteredState, skeletons) =>
  { // values are passed in here from the component mapStateToProps
    /** show_sample_project **/
    qonsole.debug(qonsole.NORM, 'REDUX', '\tIf we are going to be manipulating the original array/object of information then we want to' +
    'utilize the power of `Reselect` for Memoization: http://redux.js.org/docs/recipes/ComputingDerivedData.html');
    /** end_show_sample_project **/
    switch (alteredState)
    {
      case 'REMOVE_BONE':
      case 'BREAK_BONE':
        return skeletons.filter((s) => s.bojangles);
      case 'ADD_BONE':
        return skeletons.filter((s) => !s.bojangles);
      default :
        return skeletons;
    }
  }
);

export const getSearchedSkeleton = createSelector(
  [getFilteredBojangles, getSearchTerm],
  (filteredBojangles, term) =>
    (filteredBojangles)
      ? filteredBojangles.filter((skeleton) => skeleton.name.includes(term))
      : filteredBojangles
);
