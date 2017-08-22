/**SHOW_FLOW_LOG**/console.log('REDUX - \n\tMERNSkeleton/client/containers/Skeleton/reducer.js\n\t\tCreate conntainer/component reducer - NO logic in this file');/**END_SHOW_FLOW_LOG**/

import { combineReducers } from 'redux'
import { fromJS,toJS,toObject } from 'immutable';

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

/* Selectors */
export const getAlteredState = (state) =>
{
  console.info('We use selectors to filter to the correct piece of information when receiving the data in the component');
  console.log('For instance, if we were just to try to access the state we would see:',state);
  console.log('Instead, we use the selector to filter out the extaneous information that we do not need and return:',state._root.entries[2][1].alterBones);

  let tmp = state._root.entries,
      ret = tmp.filter((itm) => itm[0] === 'skeleton');

  return ret[1].alterBones;
};

export const getAllBojangles = (state) =>
{
  console.log('If we are going to be manipulating the original array/object of information then we want to');
  console.log('utilize the power of `Reselect` for Memoization: http://redux.js.org/docs/recipes/ComputingDerivedData.html');
  
}

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

);
export default skeletonReducer;
