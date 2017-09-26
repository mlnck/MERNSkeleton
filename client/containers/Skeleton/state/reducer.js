import { fromJS } from 'immutable';

import { ALTER_BONE, AlterBone, CREATE_SAGA_SKELETON_SUCCESS, DELETE_SAGA_SKELETON_SUCCESS, FETCH_SAGA_SKELETON_FAILED, CREATE_SKELETON, SEARCH_SKELETON, TOGGLE_BOJANGLES } from './constants';
import { alterBone } from './actions';

/** show_sample_project **/
import { qonsole } from 'qonsole'; //eslint-disable-line
qonsole.debug(qonsole.NORM, 'REDUX', '\tMERNSkeleton/client/containers/Skeleton/state/reducer.js', '\t\tCreate conntainer/component reducer', '\t\t\tRECCOMMENDED TO KEEP ALL LOGIC OUT OF THIS FILE');
/** end_show_sample_project **/

const { NO_ALTERATIONS } = AlterBone;

const initialState = fromJS({
  alterBones: alterBone.NO_ALTERATIONS,
  skeletons: [],
  skeletonSearch: ''
});

function skeletons(state = [], action)
{
  switch (action.type)
  {
    case CREATE_SKELETON:
      return [
        ...state,
        { name: action.text, bojangles: false, inState: true }
      ];
    case TOGGLE_BOJANGLES:
      return state.map((skeleton, index) =>
      {
        if(index === action.index)
        {
          return { ...skeleton, bojangles: !skeleton.bojangles };
        }
        return skeleton;
      });
    case FETCH_SAGA_SKELETON_FAILED:
      qonsole.debug(qonsole.ERROR, 'FETCH_SAGA_SKELETON_FAILED', action);
      qonsole.debug(qonsole.ERROR, 'FETCH_SAGA_SKELETON_FAILED', action.skelSaga);
      return state;
    case CREATE_SAGA_SKELETON_SUCCESS:
      qonsole.debug('CREATE_SAGA_SKELETON_SUCCESS', action);
      qonsole.debug('CREATE_SAGA_SKELETON_SUCCESS', action.skelSaga);
      return [
        ...state,
        { name: action.skelSaga.title, bojangles: false, inState: true }
      ];
    // allowing declaration here for example purpose only
    case DELETE_SAGA_SKELETON_SUCCESS: // eslint-disable-line
      console.log('DELETING DELETE_SAGA_SKELETON_SUCCESS');
      const deletedSagaSkels = state.filter((itm) =>
      {
        qonsole.debug('del-itm', itm);
        return itm.name !== 'Tony';
      });
      qonsole.debug('deletedSagaSkels:', deletedSagaSkels);
      return deletedSagaSkels;
    default:
      return state;
  }
}

function skeletonSearch(state = '', action)
{
  switch (action.type)
  {
    case SEARCH_SKELETON:
      return action.text;
    default:
      return state;
  }
}

function alterBones(state = NO_ALTERATIONS, action)
{
  switch (action.type)
  {
    case ALTER_BONE:
      return action.altered;
    default:
      return state;
  }
}

function skeletonReducer(state = initialState, action)
{
  return {
    alterBones: alterBones(state.alterBones, action),
    skeletons: skeletons(state.skeletons, action),
    skeletonSearch: skeletonSearch(state.skeletonSearch, action)
  };
}

/** show_sample_project **/
qonsole.debug(qonsole.NORM, 'REDUX NOTE:', 'This combineReducer used here could be mapped to differnt keys using one of the below for the same effect',
  `const skeletonReducer = combineReducers({
  alterBone: skeletonAlterBoneComposition,
  skeleton:skeletonUpsertComposition
})

const skeletonReducer = combineReducers({
  alterBone,
  skeletons
});

function skeletonReducer(state = initialState, action) {
  return {
          alterBone: skeletonAlterBoneComposition(state.alterBone, action),
          skeleton:skeletonUpsertComposition(state.skeletons, action)
        }
}`
/** end_show_sample_project **/

);
export default skeletonReducer;
