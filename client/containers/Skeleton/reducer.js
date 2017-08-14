/**SHOW_FLOW_LOG**/console.log('REDUX - \n\tMERNSkeleton/client/containers/Skeleton/reducer.js\n\t\tCreate conntainer/component reducer - NO logic in this file');/**END_SHOW_FLOW_LOG**/

import { combineReducers } from 'redux'
import { fromJS } from 'immutable';

import { ALTER_BONE, AlterBone, CREATE_SKELETON, TOGGLE_BOJANGLES } from './constants';
import { alterBone } from './actions';

const { NO_ALTERATIONS } = AlterBone;

const initialState = fromJS({
  alterBones: alterBone.NO_ALTERATIONS,
  skeletons:[]
});

function skeletons(state=[], action)
{
  switch(action.type)
  {
    case CREATE_SKELETON:
      return [
                ...state,
                { name:action.text, bojangles:false }
             ]
    case TOGGLE_BOJANGLES:
      return state.map((skeleton,index) => {
        if(index === action.index){
          return { ...skeleton, bojangles:!skeleton.bojangles }
        }
        return skeleton
      })
    default:
      return state
  }
}

function alterBones(state = NO_ALTERATIONS, action) {
  switch (action.type) {
    case ALTER_BONE:
      return action.altered
    default:
      return state
  }
}

function skeletonReducer(state = initialState, action){
  return {
    alterBones:alterBones(state.alterBones, action),
    skeletons:skeletons(state.skeletons, action)
  }
};

/**SHOW_FLOW_LOG**/
console.info('NOTE: this combineReducer used here could be mapped to differnt keys using one of the below for the same effect'+
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
/**END_SHOW_FLOW_LOG**/
);
export default skeletonReducer;
