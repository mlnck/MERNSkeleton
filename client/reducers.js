/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from './containers/Root/reducer';
/** show_sample_project **/
// remember path in CL
import skeletonReducer from './containers/Skeleton/state/reducer';
import { qonsole } from 'qonsole'; //eslint-disable-line
qonsole.debug(qonsole.NORM, 'REDUX', '\tMERNSkeleton/client/reducers.js', '\t\tCombine Reducer Files Here');
/** end_show_sample_project **/

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action)
{
  switch (action.type)
  {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
/** show_sample_project **/
qonsole.debug(qonsole.NORM, 'REDUX', '\tMERNSkeleton/client/reducers.js', '\t\tCombining all reducers for use with store object');
/** end_show_sample_project **/
export default function createReducer(asyncReducers)
{
  return combineReducers({
    route: routeReducer,
    global: globalReducer,
    /** show_sample_project **/skeleton: skeletonReducer, /** end_show_sample_project **/
    ...asyncReducers,
  });
}
