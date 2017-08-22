console.log('REDUX - \n\tMERNSkeleton/client/containers/Skeleton/reducer.js\n\t\tCreate selectors to be used from the ./index.js file');
import { createSelector } from 'reselect'

export const getAlteredState = (state) =>
{
  console.info('We use selectors to filter to the correct piece of information when receiving the data in the component');
  console.log('For instance, if we were just to try to access the state we would see:',state);
  console.log('Instead, we use the selector to filter out the extaneous information that we do not need and return:',state._root.entries[2][1].alterBones);

  let tmp = state._root.entries,
      ret = tmp.filter((itm) => itm[0] === 'skeleton');

  return (ret) ? ret[0][1].alterBones : '';
};

export const getSkeletons = (state) =>
{
  let tmp = state._root.entries,
      ret = tmp.filter((itm) => itm[0] === 'skeleton');
  return (ret) ? ret[0][1].skeletons : [];
}

export const getSearchTerm = (state) =>
{
  let tmp = state._root.entries,
      ret = tmp.filter((itm) => itm[0] === 'skeleton');
  return (ret) ? ret[0][1].skeletonSearch : '';
}

// export const getFilteredBojangles = () =>{console.log('non breaking'); return []}
export const getFilteredBojangles = createSelector(
  [ getAlteredState, getSkeletons ],//use the results of these for our return logic
  (alteredState, skeletons) => {//values are passed in here from the component mapStateToProps
    console.log('If we are going to be manipulating the original array/object of information then we want to');
    console.log('utilize the power of `Reselect` for Memoization: http://redux.js.org/docs/recipes/ComputingDerivedData.html');
    switch (alteredState) {
      case 'NO_ALTERATIONS':
        return skeletons
      case 'REMOVE_BONE':
      case 'BREAK_BONE':
        return skeletons.filter(s => s.bojangles)
      case 'ADD_BONE':
        return skeletons.filter(s => !s.bojangles)
    }
  }
);

export const getSearchedSkeleton = createSelector(
  [getFilteredBojangles, getSearchTerm],
  (filteredBojangles,term) =>
  {
    return  (filteredBojangles)
      ? filteredBojangles.filter( skeleton => skeleton.name.includes(term) )
      : filteredBojangles;
  }
);
