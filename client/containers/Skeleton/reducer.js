/**SHOW_FLOW_LOG**/console.log('REDUX - \n\tMERNSkeleton/client/containers/Skeleton/reducer.js\n\t\tCreate conntainer/component reducer - NO logic in this file');/**END_SHOW_FLOW_LOG**/

import { combineReducers } from 'redux'
import { fromJS } from 'immutable';

import { ALTER_BONE, CREATE_SKELETON, TOGGLE_BOJANGLES, AlterBone } from './constants';
import { alterBone } from './actions';

const { NO_ALTERATIONS } = AlterBone;

const initialState = fromJS({
  alterBone: alterBone.NO_ALTERATIONS,
  skeletonsById: [],
  skeletons:[]
});

function skeletonUpsertComposition(state=[], action)
{
  switch(action.type)
  {
    case CREATE_SKELETON:
      return [
                ...state,
                {
                  skeletonsById: [ action.id ],
                  skeletons: [ ...state.skeletons, { id:action.id, name:action.text, bojangles:false } ]
                }
            ]
    case TOGGLE_BOJANGLES:
      return [
                ...state,
                {
                  skeletons: state.skeletons.map((skel,indx) => {
                    if(indx === action.index){ return {...skel, bojangles:!skel.bojangles} }
                  })
                }
              ]
  }
}

function skeletonAlterBoneComposition(state = NO_ALTERATIONS, action) {
  switch (action.type) {
    case ALTER_BONE:
      return action.altered
    default:
      return state
  }
}

function skeletonReducer(state = initialState, action) {
  return {
          alterBone: skeletonAlterBoneComposition(state.alterBone, action),
          skeleton:skeletonUpsertComposition(state.skeletons, action)
        }
}

/**SHOW_FLOW_LOG**/
console.info('NOTE: this combineReducer used here could be mapped to differnt keys using one of the below for the same effect'+
`const skeletonReducer = combineReducers({
  alterBone: skeletonAlterBoneComposition(state.alterBone, action),
  skeleton:skeletonUpsertComposition(state.skeletons, action)
})

function skeletonReducer(state = initialState, action) {
  return {
          alterBone: skeletonAlterBoneComposition(state.alterBone, action),
          skeleton:skeletonUpsertComposition(state.skeletons, action)
        }
}`
/**END_SHOW_FLOW_LOG**/
);
export default skeletonReducer;
